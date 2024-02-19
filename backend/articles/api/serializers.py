from rest_framework import serializers

from .models import Article, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ('parent',)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class ArticleListSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'
        
    def get_categories(self,obj:Article):
        categories = obj.categories.all()
        _categories = []
        
        for category in categories:
            _categories.append(category)
            
        return _categories