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
from rest_framework.views import APIView
from rest_framework.decorators import action
from .serializers import UserSerializer,ModeratorSerializer, LoginSerializer, UserImageSerializer, PasswordResetConfirmSerializer, PasswordResetSerializer, ChangePasswordSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.core.mail import send_mail
from django.conf import settings

from .models import UserPasswordResetToken,Moderator
import datetime
from django.utils import timezone

# Create your views here.

User = get_user_model()


class CheckUserNameView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Check If a Username Already exists",
        manual_parameters=[
            openapi.Parameter(
                "username",
                openapi.IN_PATH,
                description="username to check",
                type=openapi.TYPE_STRING,
            ),
        ],
    )
    def get(self, requests, username=None):
        exists = False
        if username:
            exists = User.objects.filter(username=username).exists()

        return Response({"exists": exists})

class GetUserByUserName(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Get a user by username",
        manual_parameters=[
            openapi.Parameter(
                "username",
                openapi.IN_PATH,
                description="username to check",
                type=openapi.TYPE_STRING,
            ),
        ],
    )
    def get(self, requests, username=None):

        if username:
            users = User.objects.filter(username=username)
            if users.exists():
                queryset = users.first()
                serializer = UserSerializer(queryset,context={'request':requests})
                return Response(serializer.data)

            else:
                return Response({"message":f"user with username {username} not found"},status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"message":"Please provide the username"},status=status.HTTP_400_BAD_REQUEST)


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
                {"message": "Invalid Credentials", "success": False},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = Token.objects.get(user=user)

        login(request, user)
        return Response(
            {
                "token": token.key,
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "success": True,
            }
        )


class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ModeratorViewSet(CreateModelMixin,UpdateModelMixin,RetrieveModelMixin,ListModelMixin,GenericViewSet):

    queryset = Moderator.objects.all()
    serializer_class = ModeratorSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


class UserViewSet(
    CreateModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    pagination_class = PageNumberPagination

    def get_serializer_class(self):

        if self.action == "update_image":
            return UserImageSerializer
        return UserSerializer

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

    @action(methods=["get"], detail=False)
    def current_user(self, request):
        user = self.get_queryset().filter(id=self.request.user.id).first()
        serializer = self.get_serializer_class()(user)
        return Response(serializer.data)

    @action(methods=["post"], detail=True, url_path='update-image', parser_classes=[MultiPartParser])
    def update_image(self, request, pk=None):
        user = self.get_object()
        serializer = UserImageSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=PasswordResetSerializer)
    def post(self, request):

        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get('email')

        user = User.objects.get(email=email)

        user_password_reset_token = UserPasswordResetToken.objects.create(
            user=user)

        subject = 'Reset Password Code'
        message = f'Hello,\n\nYou have requested to reset your password for the wikiculture app. Please copy the following code and paste it in the appropriate field: {user_password_reset_token.code}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe wikiculture Team'
        send_mail(subject=subject,
                  message=message,
                  from_email=settings.EMAIL_HOST_USER,
                  recipient_list=[email])

        return Response({"success": "Password reset code has been sent to your email."}, status=status.HTTP_200_OK)


class VerifyCodeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, code):

        current_datetime = timezone.now()

        # Calculate the datetime 4 hours ago
        four_hours_ago = current_datetime - datetime.timedelta(hours=4)

        # Filter UserPasswordResetToken objects with created_at <= 4 hours ago
        exists = UserPasswordResetToken.objects.filter(
            code=code,
            reset_at=None,
            created_at__gte=four_hours_ago
        ).exists()

        return Response({"exists": exists})


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]


    @swagger_auto_schema(request_body=PasswordResetConfirmSerializer)
    def post(self,request):

        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validate['code']
        new_password = serializer.validate['new_password']

        current_datetime = timezone.now()

        # Calculate the datetime 4 hours ago
        four_hours_ago = current_datetime - datetime.timedelta(hours=4)

        user_token =  UserPasswordResetToken.objects.get(
            code=code,
            reset_at=None,
            created_at__gte=four_hours_ago
        )

        user =  user_token.user
        user.set_password(new_password)
        user.save()

        user_token.reset_at = timezone.now()

        user_token.save()

        return Response({"message":"Password Reset Successfully"})
