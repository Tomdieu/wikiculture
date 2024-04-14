from rest_framework import serializers

from .models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class FileCreateSerializer(serializers.Serializer):
    file = serializers.FileField()


class FileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file']
