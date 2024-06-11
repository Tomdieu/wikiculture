from django.dispatch import receiver

from django.db.models.signals import post_save, pre_delete, pre_save,m2m_changed
from .models import Article
from .serializers import ArticleListPublishSerializer
from .producer import publish
from . import events


@receiver(post_save, sender=Article)
def publish_article(sender, instance, created, **kwargs):
    if created:
        serializer = ArticleListPublishSerializer(instance)
        publish(event_type=events.ARTICLE_CREATED, body=serializer.data)

    else:
        serializer = ArticleListPublishSerializer(instance)
        publish(event_type=events.ARTICLE_UPDATED, body=serializer.data)


@receiver(pre_save, sender=Article)
def update_article_update_field(sender, instance: Article, **kwargs):
    if instance.pk:
        instance.updated = True

    if instance.author.user_type in ["Moderator", "Admin"]:
        instance.approved = True


@receiver(pre_delete, sender=Article)
def delete_article(sender, instance, **kwargs):
    serializer = ArticleListPublishSerializer(instance)
    publish(event_type=events.ARTICLE_DELETED, body=serializer.data)

@receiver(m2m_changed, sender=Article.categories.through)
def categories_changed(sender, instance, **kwargs):
    instance.record_m2m_history()

@receiver(m2m_changed, sender=Article.tags.through)
def tags_changed(sender, instance, **kwargs):
    instance.record_m2m_history()