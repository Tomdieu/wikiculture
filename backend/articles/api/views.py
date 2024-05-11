from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin, \
    UpdateModelMixin
from rest_framework.response import Response
from .models import Article, Category,ReadingTime
from .serializers import ArticleSerializer, CategorySerializer, ArticleListSerializer,ReadingTimeSerializer,ArticleHistorySerializer,ArticleHistoryDeleteSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import action


# Create your views here.

class ArticleViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin,
                     UpdateModelMixin):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        if self.action in ['list','retrieve']:  # AllowAny for 'list' action
            return [AllowAny()]
        return [IsAuthenticated()]  # For other actions, use IsAuthenticated permission

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ArticleListSerializer
        return ArticleSerializer

    @swagger_auto_schema(operation_description="List of articles with optional query params",
                         manual_parameters=[
                             openapi.Parameter('tag', openapi.IN_QUERY, description="Tag name",
                                               type=openapi.TYPE_STRING),
                             openapi.Parameter('category', openapi.IN_QUERY, description="Category name",
                                               type=openapi.TYPE_STRING)
                         ])
    def list(self, request, *args, **kwargs):
        # Get the tag and category from the query params
        tag = request.query_params.get('tag', None)
        category = request.query_params.get('category', None)
        queryset = self.get_queryset()

        if tag:
            queryset = queryset.filter(tags__name__in=[tag])

        if category:
            queryset = queryset.filter(categories__name=category)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(ArticleListSerializer(instance).data, status=status.HTTP_201_CREATED, headers=headers)
    
    
    @action(methods=['get'],detail=False)
    def mine(self,request,*args, **kwargs):
        
        user = request.user
        print("User : ",user, " id : ",user.id)
        articles = Article.objects.filter(author_id=user.id)
        serializer = ArticleListSerializer(articles,many=True)
        return Response(serializer.data)
    

    @action(detail=True)
    def versions(self,request,*args,**kwargs):
        instance = self.get_object()

        history = Article.history.model.objects.filter(id=instance.id)

        serializer = ArticleHistorySerializer(history,many=True)

        return Response(serializer.data)
    
    @action(detail=True,methods=['post'],url_path='delete-version',serializer_class=ArticleHistoryDeleteSerializer)
    def delete_version(self,request,*args,**kwargs):
        user = request.user
        instance = self.get_object()

        if instance.author == user or (user.user_type == "Moderator" or  user.user_type == "Admin"):

            HistoryModel = Article.history.model

            serializer = ArticleHistoryDeleteSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            ids = serializer.validate.get('ids',[])
            histories = HistoryModel.objects.filter(id__in=ids)
            histories.delete()

            return Response({"message":"History Deleted Successfully"},status=status.HTTP_204_NO_CONTENT)
        return Response({"message":"Permission deny"},status=status.HTTP_401_UNAUTHORIZED)





class CategoryViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin,
                      UpdateModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ReadingTimeView(APIView):
    permission_classes = [IsAuthenticated,AllowAny]
    authentication_classes = [TokenAuthentication]
    def post(self, request, format=None):
        user = request.user
        
        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')
        
        article_id = request.data.get('article_id')
        time_spent = request.data.get('time_spent')

        # Retrieve or create ReadingTime object
        reading_time, created = ReadingTime.objects.get_or_create(user=user, article_id=article_id,ip_address=ip_address,user_agent=user_agent)
        
        # Update total time spent
        reading_time.total_time_spent += int(time_spent)
        reading_time.save()

        serializer = ReadingTimeSerializer(reading_time)
        return Response(serializer.data, status=status.HTTP_201_CREATED)