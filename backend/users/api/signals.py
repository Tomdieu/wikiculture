from django.dispatch import receiver
from django.db.models.signals import post_save,pre_delete
from rest_framework.authtoken.models import Token
from . import events
from .producer import publish
from .serializers import UserSerializer
from  django.contrib.auth import get_user_model
from django.contrib.auth.signals import user_logged_in
from .models import LoginHistory
from django.utils import timezone
import httpagentparser


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
        
    # else:
        
    #     serializer = UserSerializer(instance)
    #     publish(
    #         event_type=events.USER_UPDATED,
    #         body=serializer.data
    #     )
        
    #     print("Send To RabbitMq")
        
        
@receiver(pre_delete,sender=User)
def delete_auth_token(sender,instance=None,**kwargs):
    serializer = UserSerializer(instance)
    publish(
        event_type=events.USER_DELETED,
        body=serializer.data
    )
    
    print("Send To RabbitMq")


@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    ip_address = get_client_ip(request)
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    browser_info = parse_user_agent(user_agent)

    LoginHistory.objects.create(
        user=user,
        ip_address=ip_address,
        user_agent=user_agent,
        browser_info=browser_info,
        timestamp=timezone.now()
    )

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def parse_user_agent(user_agent):
    browser_info = httpagentparser.detect(user_agent)
    browser = browser_info.get('browser', {})
    browser_name = browser.get('name', 'Unknown')
    browser_version = browser.get('version', 'Unknown')
    os_info = browser_info.get('os', {})
    os_name = os_info.get('name', 'Unknown')
    os_version = os_info.get('version', 'Unknown')
    return f"{browser_name} {browser_version} on {os_name} {os_version}"