from rest_framework import serializers

from .models import ModerationRecord, Article, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "content", "approved"]


class ModerationRecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModerationRecord
        fields = ["article", "decision", "feedback"]


class ModerationRecordSerializer(serializers.ModelSerializer):
    article = ArticleSerializer()
    moderator = UserSerializer()

    class Meta:
        model = ModerationRecord
        fields = ["moderator", "article", "decision", "feedback"]
