from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet,ViewSet
from rest_framework.mixins import CreateModelMixin,UpdateModelMixin,DestroyModelMixin,ListModelMixin
from rest_framework.views import APIView

from .authentication import TokenAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated

from .serializers import CommentSerializer,CommentCreateSerializer
from .models import Article,Comments,User

from rest_framework import status

# Create your views here.


class CommentViewSet(CreateModelMixin,UpdateModelMixin,DestroyModelMixin,ListModelMixin,GenericViewSet):
    
    def get_permissions(self):
        if self.action in ['list','retrieve']:  # AllowAny for 'list' action
            return [AllowAny()]
        return [IsAuthenticated()]  # For other actions, use IsAuthenticated permission
    
    
    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
            return CommentSerializer
        else:
            return CommentCreateSerializer
            
    
    authentication_classes = [TokenAuthentication]
    
    queryset = Comments.objects.filter(parent=None)
    
    def destroy(self, request, *args, **kwargs):
        user:User = request.user
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if user.id == serializer.author.id:
            return super().destroy(request, *args, **kwargs)

        return Response({"message":"You are not allowed to delete someone comment"},status=status.HTTP_401_UNAUTHORIZED)

class ArticleCommentsViewSet(APIView):
    
    # permission_classes = [IsAuthenticated()]
    
    def get(self,request,article_id:int):
        
        comments = Comments.objects.filter(article_id=article_id)
        serializer = CommentSerializer(comments,many=True,context={'request':request})
        
        return Response(serializer.data)
    
