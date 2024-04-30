from django.dispatch import receiver
from django.db.models.signals import post_save,pre_delete
from rest_framework.authtoken.models import Token
from . import events
from .producer import publish
from .serializers import UserSerializer
from  django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save,sender=User)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)
        serializer = UserSerializer(instance)
        publish(
            event_type=events.USER_CREATED,
            body=serializer.data
        )
        
        print("Send To RabbitMq")
        
    else:
        
        serializer = UserSerializer(instance)
        publish(
            event_type=events.USER_UPDATED,
            body=serializer.data
        )
        
        print("Send To RabbitMq")
        
        
@receiver(pre_delete,sender=User)
def delete_auth_token(sender,instance=None,**kwargs):
    serializer = UserSerializer(instance)
    publish(
        event_type=events.USER_DELETED,
        body=serializer.data
    )
    
    print("Send To RabbitMq")