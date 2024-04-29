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
from rest_framework.decorators import action
from .serializers import UserSerializer, LoginSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token

from rest_framework import status

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
                {"message": "Invalid Credentials", "success": False}, status=status.HTTP_400_BAD_REQUEST
            )

        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response(
            {
                "token": token.key,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "success":True
            }
        )

class RegisterViewSet(CreateModelMixin,GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

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
        return User.objects.all()

    def get_object(self):
        if self.action == "retrieve":
            return self.request.user
        else:
            return super().get_object()

    def perform_update(self, serializer):
        serializer.save()
        return serializer.instance


    @action(methods=['get'],detail=False)
    def current_user(self,request):
        user = self.get_queryset().filter(id=self.request.user.id).first()
        serializer = self.get_serializer_class()(user)
        return Response(serializer.data)