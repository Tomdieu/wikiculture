from django.shortcuts import render
from rest_framework.response import  Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .authentication import TokenAuthentication

from .models import File
from .serializers import FileSerializer, FileCreateSerializer, FileUpdateSerializer


# Create your views here.

class FileUploadViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin,
                        GenericViewSet):
    serializer_class = FileSerializer

    queryset = File.objects.all()

    authentication_classes = [IsAuthenticated]
    permission_classes = [TokenAuthentication]

    def get_serializer_class(self):

        if self.action in ['create']:
            return FileCreateSerializer
        elif self.action in ['update']:
            return FileUpdateSerializer
        else:
            return FileSerializer

    def create(self, request, *args, **kwargs):

        serializer: FileCreateSerializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get authenticated user from the request
        user = request.user

        # Extract Data from the serializer
        data = serializer.validated_data

        name = data['file'].name
        file_obj = File.objects.create(name=name,user=user,file=data['file'])

        return Response(FileSerializer(file_obj).data,status=status.HTTP_201_CREATED)


