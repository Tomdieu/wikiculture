from rest_framework import serializers

from .models import ModerationRecord,Article

class ArticleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = ['article_id']

class ModerationRecordCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ModerationRecord
        fields = ['article','decision','feedback']
        

class ModerationRecordSerializer(serializers.ModelSerializer):
    
    article = ArticleSerializer()
    
    class Meta:
        model = ModerationRecord
        fields = ['article','decision','feedback']
        
