from django.shortcuts import render
from rest_framework.response import  Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from .authentication import TokenAuthentication

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import File,User
from .serializers import FileSerializer, FileCreateSerializer, FileUpdateSerializer
from rest_framework.decorators import action

from rest_framework.parsers import MultiPartParser


# Create your views here.

class FileUploadViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin,
                        GenericViewSet):
    serializer_class = FileSerializer

    parser_classes = [MultiPartParser]

    queryset = File.objects.all()

    permission_classes = [TokenAuthentication]

    def get_permissions(self):

        if self.action in ['list','retrieve']:
            return [ AllowAny()]
        return  [IsAuthenticated()]

    def get_serializer_class(self):

        if self.action in ['create']:
            return FileCreateSerializer
        elif self.action in ['update']:
            return FileUpdateSerializer
        else:
            return FileSerializer

    @swagger_auto_schema(
        operation_id='Upload a file',
        operation_description='Upload a file',
        manual_parameters=[
            openapi.Parameter('file', openapi.IN_FORM, type=openapi.TYPE_FILE, description='File to be uploaded'),
        ],
        responses={
            status.HTTP_200_OK: openapi.Response(
                'Success', schema=openapi.Schema(type=openapi.TYPE_OBJECT, properties={
                    'id': openapi.Schema(type=openapi.TYPE_STRING, description='file ID'),
                    'name': openapi.Schema(type=openapi.TYPE_STRING, description='name of the file'),
                    'file': openapi.Schema(type=openapi.TYPE_STRING, description='file url'),
                    'uploaded_at': openapi.Schema(type=openapi.TYPE_STRING, description='time at which the file has '
                                                                                        'been uploaded'),

                })
            )
        }
    )
    def create(self, request, *args, **kwargs):

        serializer: FileCreateSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get authenticated user from the request
        user = request.user

        # Extract Data from the serializer
        data = serializer.validated_data

        name = data['file'].name

        file_obj = File.objects.create(name=name,user=user,file=data['file'])

        return Response(FileSerializer(file_obj,context={'request':request}).data,status=status.HTTP_201_CREATED)


class MediaViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin,
                        GenericViewSet):
    serializer_class = FileSerializer

    parser_classes = [MultiPartParser]

    queryset = File.objects.all()

    permission_classes = [TokenAuthentication]
    
    def get_permissions(self):

        if self.action in ['list','retrieve']:
            return [ AllowAny()]
        return  [IsAuthenticated()]

    def get_serializer_class(self):

        if self.action in ['update']:
            return FileUpdateSerializer
        else:
            return FileSerializer
        
    @action(methods=['get'],detail=False)
    def my_files(self,request,pk=None):
        
        user = request.user
        
        media_files = File.objects.filter(user=user)
        serializer = self.get_serializer(media_files,many=True)
        return Response(serializer.data)