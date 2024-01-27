from django.shortcuts import render

from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin, \
    UpdateModelMixin

from .models import Article, Category
from .serializers import ArticleSerializer, CategorySerializer, ArticleListSerializer


# Create your views here.

class ArticleViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin,
                     UpdateModelMixin):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ArticleListSerializer
        return ArticleSerializer


class CategoryViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin,
                      UpdateModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
