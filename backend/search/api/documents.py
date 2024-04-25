from django_elasticsearch_dsl import Document, fields, Index
from django_elasticsearch_dsl.registries import registry
# from elasticsearch_dsl import analyzer

from .models import Article,User

@registry.register_document
class UserDocument(Document):
    class Index:
        name = "users"
    
    settings = {
        "number_of_shards": 1,
        "number_of_replicas": 0,
    }

    class Django:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
        ]

# @registry.register_document
# class CategoryDocument(Document):
#     id = fields.IntegerField()

#     class Index:
#         name = "categories"
    
#     settings = {
#         "number_of_shards": 1,
#         "number_of_replicas": 0,
#     }

#     class Django:
#         model = Category
#         fields = [
#             "name",
#         ]

@registry.register_document
class ArticleDocument(Document):
    author = fields.ObjectField(properties={
        "id": fields.IntegerField(),
        "first_name": fields.TextField(),
        "last_name": fields.TextField(),
        "username": fields.TextField(),
    })
    
    # categories = fields.ObjectField(properties={
    #     "id": fields.IntegerField(),
    #     "name": fields.TextField(),
    # })

    # tags = fields.TextField(attr="get_tags")

    class Index:
        name = "articles"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        }

    # def get_model(self):
    #     return Article

    # def prepare_tags(self, instance):
    #     return [tag.name for tag in instance.tags.all()]
    
    
    def get_queryset(self):
        return super(ArticleDocument,self).get_queryset().select_related('author')

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, User):
            return related_instance.article_set.all()

    class Django:
        model = Article
        fields = [
            "id",
            "title",
            "content",
            "tags",
            "categories",
            "slug"
        ]
        related_models = [User]
