from rest_framework import serializers

from .models import Notification, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id']


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Notification
        fields = '__all__'
