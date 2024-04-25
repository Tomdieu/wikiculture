from rest_framework import serializers

from .models import Article,User
# from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
# from .documents import UserDocument,ArticleDocument

# class UserDocumentSerializer(DocumentSerializer):
    
#     class Meta:
#         document = UserDocument
#         fields = ('id', 'username', 'first_name', 'last_name', 'email', )
        
        
# class ArticleDocumentSerializer(DocumentSerializer):
    
#     class Meta:
        
#         document = ArticleDocument
#         fields = '__all__'
        

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = User
        fields = '__all__'
        
# class CategorySerializer(serializers.ModelSerializer):
    
#     class Meta:
        
#         model = Category
#         fields = '__all__'
        
class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    
    class Meta:
        
        model = Article
        fields = [
            "id",
            "title",
            "content",
            "tags",
            "categories",
            "author",
            "slug"
        ]