from rest_framework import serializers

from .models import File, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        source="user", queryset=User.objects.all()
    )

    size = serializers.IntegerField(read_only=True)

    class Meta:
        model = File
        fields = "__all__"


class FileCreateSerializer(serializers.Serializer):
    file = serializers.FileField()


class FileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ["file"]


class FileReplaceSerializer(serializers.Serializer):
    replaceTargetUrl = serializers.URLField()
    file = serializers.FileField()


class FileDeleteSerializer(serializers.Serializer):
    url = serializers.URLField()
