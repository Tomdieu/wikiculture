from rest_framework import serializers

from .models import File,User

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = File
        fields = '__all__'


class FileCreateSerializer(serializers.Serializer):
    file = serializers.FileField()


class FileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file']
