from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .authentication import TokenAuthentication
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import os
from django.core.exceptions import ObjectDoesNotExist
from .models import File, User
from .serializers import (
    FileSerializer,
    FileCreateSerializer,
    FileUpdateSerializer,
    FileReplaceSerializer,
    FileDeleteSerializer,
)
from rest_framework.decorators import action

from urllib.parse import urlparse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser


# Create your views here.


class DeleteFileView(APIView):
    @swagger_auto_schema(
        operation_id="Delete a file",
        operation_description="Delete a file definitely",
        request_body=FileDeleteSerializer,
    )
    def post(self, request):
        serializer = FileDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        url = serializer.validated_data.get("url")

        # Extract the relative path of the file from the URL
        parsed_url = urlparse(url)
        relative_path = os.path.relpath(parsed_url.path, settings.MEDIA_URL)

        try:
            # Find the file based on the relative path
            file_obj = File.objects.get(file=relative_path)

            # Delete the old file
            if os.path.isfile(file_obj.file.path):
                os.remove(file_obj.file.path)

            # Replace it with the new file
            file_obj.delete()

            return Response(
                {"message": "File deleted"},
                status=status.HTTP_200_OK,
            )
        except ObjectDoesNotExist:
            return Response(
                {"error": "File not found"}, status=status.HTTP_404_NOT_FOUND
            )


class FileReplaceView(APIView):
    parser_classes = [MultiPartParser]

    @swagger_auto_schema(
        operation_id="Replace a file",
        operation_description="Replace a file",
        request_body=FileReplaceSerializer,
    )
    def post(self, request):
        serializer = FileReplaceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        replace_target_url = serializer.validated_data.get("replaceTargetUrl")
        file = serializer.validated_data.get("file")

        # Extract the relative path of the file from the URL
        parsed_url = urlparse(replace_target_url)
        relative_path = os.path.relpath(parsed_url.path, settings.MEDIA_URL)

        try:
            # Find the file based on the relative path
            file_obj = File.objects.get(file=relative_path)

            # Delete the old file
            if os.path.isfile(file_obj.file.path):
                os.remove(file_obj.file.path)

            # Replace it with the new file
            file_obj.file = file
            file_obj.save()

            return Response(
                FileSerializer(file_obj, context={"request": request}).data,
                status=status.HTTP_200_OK,
            )
        except ObjectDoesNotExist:
            return Response(
                {"error": "File not found"}, status=status.HTTP_404_NOT_FOUND
            )


class FileUploadViewSet(
    CreateModelMixin,
    GenericViewSet,
):
    parser_classes = [MultiPartParser]

    queryset = File.objects.all()

    authentication_classes = [TokenAuthentication]

    permission_classes = [IsAuthenticated]

    serializer_class = FileCreateSerializer

    @swagger_auto_schema(
        operation_id="Upload a file",
        operation_description="Upload a file",
        manual_parameters=[
            openapi.Parameter(
                "file",
                openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description="File to be uploaded",
            ),
        ],
        responses={
            status.HTTP_201_CREATED: openapi.Response(
                "Success",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "id": openapi.Schema(
                            type=openapi.TYPE_STRING, description="file ID"
                        ),
                        "name": openapi.Schema(
                            type=openapi.TYPE_STRING, description="name of the file"
                        ),
                        "file": openapi.Schema(
                            type=openapi.TYPE_STRING, description="file url"
                        ),
                        "category": openapi.Schema(
                            type=openapi.TYPE_STRING, description="file url"
                        ),
                        "uploaded_at": openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="time at which the file has been uploaded",
                        ),
                    },
                ),
            )
        },
    )
    def create(self, request, *args, **kwargs):
        print("Request Data :", request.data, "Files : ", request.FILES)
        serializer: FileCreateSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get authenticated user from the request
        user = request.user

        # Extract Data from the serializer
        data = serializer.validated_data

        name = data["file"].name

        file_obj = File.objects.create(name=name, user=user, file=data["file"])

        return Response(
            FileSerializer(file_obj, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class MediaViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    # serializer_class = FileSerializer

    parser_classes = [MultiPartParser]

    queryset = File.objects.all()

    authentication__classes = [TokenAuthentication]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [perm() for perm in permissions]

    def get_serializer_class(self):
        if self.action in ["update"]:
            return FileUpdateSerializer
        else:
            return FileSerializer

    @action(detail=False)
    def my_files(self, request, pk=None):
        user = request.user

        media_files = File.objects.filter(user=user)
        serializer = self.get_serializer(media_files, many=True)
        return Response(serializer.data)
