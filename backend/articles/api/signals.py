from django.dispatch import receiver

from django.db.models.signals import post_save, pre_delete, pre_save

from .models import Article
from .serializers import ArticleListSerializer
from .producer import publish
from . import events


@receiver(pre_save, sender=Article)
def update_article_update_field(sender, instance: Article, **kwargs):
    if instance.pk:
        instance.updated = True


@receiver(post_save, sender=Article)
def publish_article(sender, instance, created, **kwargs):
    if created:

        serializer = ArticleListSerializer(instance)
        publish(event_type=events.ARTICLE_CREATED, body=serializer.data)

    else:
        serializer = ArticleListSerializer(instance)
        publish(event_type=events.ARTICLE_UPDATED, body=serializer.data)


@receiver(pre_delete, sender=Article)
def delete_article(sender, instance, **kwargs):
    serializer = ArticleListSerializer(instance)
    publish(event_type=events.ARTICLE_DELETED, body=serializer.data)
