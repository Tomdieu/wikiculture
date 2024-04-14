from rest_framework import serializers
from simple_history.models import HistoricalRecords
from .models import Article, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        # exclude = ('parent',)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ArticleHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Article.history.model
        fields = '__all__'


class ArticleListSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    # history = serializers.SerializerMethodField()
    history = ArticleHistorySerializer(many=True)



    class Meta:
        model = Article
        fields = '__all__'

    def get_categories(self, obj: Article):
        categories = obj.categories.all()
        _categories = []

        for category in categories:
            _categories.append(category.name)

        return _categories

    # def get_history(self, obj: Article):
    #     model = obj.history.__dict__['model']
    #     obj.history.all().order_by('history_date')
    #     fields = ['history_id', 'history_date','history_type','history_object','history_user','instance']
    #     # serializer = HistoricalRecordField(model, obj.history.all().order_by('history_date'), fields=fields, many=True)
    #     # serializer.is_valid()
    #     # print(serializer.data)
