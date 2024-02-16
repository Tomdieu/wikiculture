from rest_framework import serializers

from .models import Article,Category,User
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .documents import UserDocument,CategoryDocument,ArticleDocument

class UserDocumentSerializer(DocumentSerializer):
    
    class Meta:
        document = UserDocument
        fields = ('id', 'username', 'first_name', 'last_name', 'email', )
        

class CategoryDocumentSerializer(DocumentSerializer):
    
    class Meta:
        document = CategoryDocument
        fields = '__all__'
        
class ArticleDocumentSerializer(DocumentSerializer):
    
    class Meta:
        
        document = ArticleDocument
        fields = '__all__'
        

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = User
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Category
        fields = '__all__'
        
class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    categories = CategorySerializer(many=True)
    class Meta:
        
        model = Article
        fields = '__all__'