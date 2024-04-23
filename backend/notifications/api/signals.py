from django.dispatch import receiver
from django.db.models.signals import post_save
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Notification
from .serializers import NotificationSerializer


@receiver(post_save, sender=Notification)
def send_notifications_to_user(sender, instance: Notification, created, *args, **kwargs):
    if created:
        serializer = NotificationSerializer(instance)
        serializer_data = serializer.data

        # Get the user's notification channel group name
        user_channel_group_name = f"notifications_{instance.user.user_id}"

        # Get the channel layer
        channel_layer = get_channel_layer()

        # Send the notification data to the user's channel group
        async_to_sync(channel_layer.group_send)(
            user_channel_group_name,
            {
                "type": "send_notification",
                "notification": serializer_data
            }
        )
