from rest_framework import serializers
from simple_history.models import HistoricalRecords
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from .models import Article, Category,User,ReadingTime

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        # exclude = ('parent',)


class ArticleSerializer(TaggitSerializer,serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Article
        fields = '__all__'

class ArticleHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Article.history.model
        fields = '__all__'


class ArticleListSerializer(TaggitSerializer,serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    tags = TagListSerializerField()
    history = ArticleHistorySerializer(many=True)
    author = UserSerializer()



    class Meta:
        model = Article
        fields = '__all__'

    def get_categories(self, obj: Article):
        categories = obj.categories.all()
        _categories = []

        for category in categories:
            _categories.append(category.name)

        return _categories
    
class ReadingTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingTime
        fields = ['user', 'article', 'time_spent']