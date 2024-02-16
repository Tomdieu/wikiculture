from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin, \
    UpdateModelMixin
from rest_framework.response import Response
from .models import Article, Category
from .serializers import ArticleSerializer, CategorySerializer, ArticleListSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .authentication import TokenAuthentication


# Create your views here.

class ArticleViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin,
                     UpdateModelMixin):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ArticleListSerializer
        return ArticleSerializer

    @swagger_auto_schema(operation_description="List of articles with optional query params",
                         manual_parameters=[
                             openapi.Parameter('tag', openapi.IN_QUERY, description="Tag name", type=openapi.TYPE_STRING),
                             openapi.Parameter('category', openapi.IN_QUERY, description="Category name",
                                               type=openapi.TYPE_STRING)
                         ])
    def list(self, request, *args, **kwargs):
        # Get the tag and category from the query params
        tag = request.query_params.get('tag',None)
        category = request.query_params.get('category',None)
        queryset = self.get_queryset()

        if tag:
            queryset = queryset.filter(tags__name__in=[tag])

        if category:

            queryset = queryset.filter(categories__name=category)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin,
                      UpdateModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
