from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet,ViewSet
from rest_framework.mixins import CreateModelMixin,UpdateModelMixin,DestroyModelMixin,ListModelMixin
from rest_framework.views import APIView

from .authentication import TokenAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated

from .serializers import CommentSerializer,CommentCreateSerializer
from .models import Article,Comments

# Create your views here.


class CommentViewSet(CreateModelMixin,UpdateModelMixin,DestroyModelMixin,ListModelMixin,GenericViewSet):
    
    def get_permissions(self):
        if self.action in ['list','retrieve']:  # AllowAny for 'list' action
            return [AllowAny()]
        return [IsAuthenticated()]  # For other actions, use IsAuthenticated permission
    
    
    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
            return CommentSerializer
        else:
            return CommentCreateSerializer
            
    # serializer_class = CommentSerializer
    
    authentication_classes = [TokenAuthentication]
    
    queryset = Comments.objects.filter(parent=None)
    

class ArticleCommentsViewSet(APIView):
    
    permission_classes = [IsAuthenticated()]
    
    def get(self,request,article_id:int):
        
        comments = Comments.objects.filter(article_id=article_id)
        serializer = CommentSerializer(comments,many=True,context={'request':request})
        
        return Response(serializer.data)
    
