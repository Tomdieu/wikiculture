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
    categories = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=Category.objects.all()))
    class Meta:
        model = Article
        # fields = '__all__'
        exclude = ('author',)
        

    def save(self, **kwargs):
        author = self.context['request'].user
        categories_data = self.validated_data.pop('categories', None)
        article = super().save(author=author, **kwargs)
        if categories_data:
            article.categories.set(categories_data)
        return article

class ArticleHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Article.history.model
        fields = '__all__'

class ArticleHistoryDeleteSerializer(serializers.Serializer):

    ids = serializers.ListSerializer(child=serializers.IntegerField())




class ArticleListSerializer(TaggitSerializer,serializers.ModelSerializer):
    # categories = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True)
    tags = TagListSerializerField()
    history = ArticleHistorySerializer(many=True)
    author = UserSerializer()



    class Meta:
        model = Article
        fields = '__all__'

    # def get_categories(self, obj: Article):
    #     categories = obj.categories.all()
    #     _categories = []

    #     for category in categories:
    #         _categories.append(category.name)

    #     return _categories
    
class ArticleDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = ['id','title','content']
    
class ReadingTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingTime
        fields = ['user', 'article', 'time_spent']