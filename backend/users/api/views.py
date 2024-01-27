from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
)

from .serializers import UserSerializer, LoginSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token

# Create your views here.

User = get_user_model()


class LoginViewSet(GenericViewSet, CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"message": "Invalid Credentials", "success": False}, status=400
            )

        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response(
            {
                "token": token.key,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
            }
        )


class UserViewSet(
    CreateModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.action == "create":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.action == "list":
            return User.objects.filter(id=self.request.user.id)
        else:
            return User.objects.all()

    def get_object(self):
        if self.action == "retrieve":
            return self.request.user
        else:
            return super().get_object()

    def perform_create(self, serializer):
        user = serializer.save()
        token = Token.objects.create(user=user)
        return user

    def perform_update(self, serializer):
        serializer.save()
        return serializer.instance
