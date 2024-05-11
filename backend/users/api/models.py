from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
import random

# Create your models here.


class User(AbstractUser):
    USER_TYPE = (("User", "User"), ("Moderator", "Moderator"), ("Admin", "Admin"))
    image = models.ImageField(upload_to="profile/", blank=True, null=True)
    bio = models.TextField(max_length=255, blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE, default="User")


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()

    def __str__(self) -> str:
        return f"{self.event_type} - {self.timestamp}"


class UserPasswordResetToken(models.Model):
    user = models.ForeignKey(User, related_name="reset_token", on_delete=models.CASCADE)
    code = models.CharField(
        max_length=6, null=True, blank=True, help_text="A six digit code"
    )
    reset_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user} Reset Password at {self.reset_at}"

    def save(self, *args, **kwargs):
        if not self.code:
            # Generate a random 6-digit code
            self.code = "".join(random.choices("0123456789", k=6))
        super().save(*args, **kwargs)
