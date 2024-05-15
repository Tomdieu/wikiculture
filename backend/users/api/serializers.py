from rest_framework import serializers
from django.contrib.auth import get_user_model
import datetime
from django.utils import timezone
from .models import UserPasswordResetToken


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "image",
            "bio",
            "date_joined",
            "user_type",
            "password",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "date_joined": {"read_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class ModeratorSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):

        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "image",
            "bio",
            "date_joined",
            "password",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "date_joined": {"read_only": True},
        }

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("image",)


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email Does Not Exist")
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6, required=True)
    new_password = serializers.CharField(max_length=120, required=True)
    confirm_password = serializers.CharField(max_length=120, required=True)

    def validate_code(self, value):

        current_datetime = timezone.now()

        # Calculate the datetime 4 hours ago
        four_hours_ago = current_datetime - datetime.timedelta(hours=4)

        if not UserPasswordResetToken.objects.filter(code=value, reset_at=None,
                                                     created_at__gte=four_hours_ago).exists():
            raise serializers.ValidationError("In Valid Code")
        return value

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        if len(confirm_password) < 8:
            raise serializers.ValidationError(
                {"confirm_password": "The confirm password must be at least 8 characters long."})

        # Check if new_password and confirm_password match
        if new_password != confirm_password:
            raise serializers.ValidationError(
                {"confirm_password": "The new password and confirm password do not match."})

        return attrs


class ChangePasswordSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(max_length=120, required=True)
    new_password = serializers.CharField(max_length=120, required=True)
    confirm_password = serializers.CharField(max_length=120, required=True)

    class Meta:
        model = User
        fields = ['current_password','new_password','confirm_password']

    def validate(self, attrs):

        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        if len(confirm_password) < 8:
            raise serializers.ValidationError(
                {"confirm_password": "The confirm password must be at least 8 characters long."})

        # Check if new_password and confirm_password match
        if new_password != confirm_password:
            raise serializers.ValidationError(
                {"confirm_password": "The new password and confirm password do not match."})

        return attrs