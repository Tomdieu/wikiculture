from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from .models import Article, Category, User, ReadingTime,Village,Region,CulturalArea,ArticleVistors
from api.lib.recommend_articles import get_village_detail

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        # exclude = ('parent',)

class CulturalAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CulturalArea
        fields = '__all__'


class RegionSerializer(serializers.ModelSerializer):
    cultural_area = CulturalAreaSerializer()

    class Meta:
        model = Region
        fields = '__all__'

class VillageSerializer(serializers.ModelSerializer):
    region = RegionSerializer()
    class Meta:
        model = Village
        fields = '__all__'

class VillageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Village
        fields = '__all__'

class RegionListSerializer(serializers.ModelSerializer):
    villages = serializers.SerializerMethodField()

    class Meta:
        model = Region
        fields = '__all__'

    def get_villages(self,obj:Region):

        villages = Village.objects.filter(region=obj)
        serializers = VillageDetailSerializer(villages,many=True)
        return serializers.data

class CulturalListSerializer(serializers.ModelSerializer):
    regions = serializers.SerializerMethodField()
    class Meta:
        model = CulturalArea
        fields = '__all__'

    def get_regions(self,obj:CulturalArea):

        regions = Region.objects.filter(cultural_area=obj)
        serializer = RegionListSerializer(regions,many=True)
        return serializer.data


class ArticleSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    categories = serializers.ListSerializer(
        child=serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    )

    class Meta:
        model = Article
        # fields = '__all__'
        exclude = ("author",)

    def save(self, **kwargs):
        author = self.context["request"].user
        categories_data = self.validated_data.pop("categories", None)
        article = super().save(author=author, **kwargs)
        if categories_data:
            article.categories.set(categories_data)
        return article


class ArticleHistorySerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Article.history.model
        fields = "__all__"

    def get_tags(self, obj):
        article_id = obj.id

        article = Article.objects.prefetch_related("tags").get(id=article_id)

        tags = article.tags.all()

        _tags = [t.name for t in tags]

        print("Tags : ", tags)

        return _tags

    def get_categories(self, obj):
        article_id = obj.id

        category = Article.objects.prefetch_related("categories").get(id=article_id)

        categories = category.categories.all()

        return CategorySerializer(categories, many=True).data


class ArticleHistoryDeleteSerializer(serializers.Serializer):
    ids = serializers.ListSerializer(child=serializers.IntegerField())


class ArticleListSerializer(TaggitSerializer, serializers.ModelSerializer):
    # categories = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True)
    tags = TagListSerializerField()
    history = ArticleHistorySerializer(many=True)
    author = UserSerializer()
    village = VillageSerializer()


    class Meta:
        model = Article
        fields = "__all__"


class ArticleListPublishSerializer(TaggitSerializer, serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    tags = TagListSerializerField()
    history = ArticleHistorySerializer(many=True)
    author = UserSerializer()
    village = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = "__all__"

    def get_categories(self, obj: Article):
        categories = obj.categories.all()
        _categories = []

        for category in categories:
            _categories.append(category.name)

        return _categories

    def get_village(self,obj:Article):
        
        return get_village_detail(obj)

class ArticleListWithRecommendationSerializer(serializers.Serializer):

    data = ArticleListSerializer()
    recommendations = serializers.ListField(child=ArticleListSerializer())

class ArticleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "content"]


class ReadingTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingTime
        fields = ["user", "article", "ip_address","user_agent","total_time_spent"]

class ReadingTimeCreateSerializer(serializers.Serializer):

    article_id = serializers.IntegerField(help_text="Article id")
    time_spent = serializers.IntegerField()

    def validate_article_id(self, value):
        """
        Custom validation for the article field to ensure the article ID exists.
        """
        try:
            article = Article.objects.get(id=value)
        except Article.DoesNotExist:
            raise serializers.ValidationError("Article with this ID does not exist.")
        return article
    
class ArticleVisitorsSerializer(serializers.Serializer):
    date = serializers.DateField()
    count = serializers.IntegerField()