from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Notification


@receiver(post_save, sender=Notification)
def send_notifications_to_user(sender, instance, created, *kwargs):
    pass
