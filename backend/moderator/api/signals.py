from django.dispatch import receiver
from django.db.models.signals import post_save


from .models import ModerationRecord
from .serializer import ModerationRecordSerializer
from . import events

from .producer import publish_article_approved

@receiver(post_save, sender=ModerationRecord)
def moderation_record_post_save(sender, instance:ModerationRecord, created:bool, **kwargs):
    
    # here base on the decision we can take some actions
    # if the decision is approved we send a message to the article service to publish the article to the public and notify the user
    # if the decision is rejected we send a message to the article service to notify the user that the article has been rejected and why
    # the communication here will be done through rabbitmq
    
    serializer = ModerationRecordSerializer(instance)
    data = serializer.data
    
    event_type = None
    routing_key = None
    
    if instance.decision == "approved":
        event_type = events.ARTICLE_APPROVED
        routing_key = "moderation.article.approved"
    else:
        event_type = events.ARTICLE_REJECTED 
        routing_key = "moderation.article.rejected"
    
    try:
    
        publish_article_approved(event_type,data,routing_key=routing_key)
    except Exception as e:
        print(f"Exception : {e}")