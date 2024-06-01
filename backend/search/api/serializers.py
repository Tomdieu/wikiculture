from rest_framework import serializers

from .models import Article, User
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .documents import ArticleDocument

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
        ]


class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Article
        fields = ["id", "title", "content", "tags", "categories", "slug","village","approved","is_published","author"]


class ArticleDocumentSerializer(DocumentSerializer):

    class Meta:
        document = ArticleDocument
        fields = ["id", "title", "content", "tags", "categories", "slug","village","approved","is_published","author"]
        