from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    USER_TYPE = (
        ('User','User'),
        ('Moderator','Moderator'),
        ('Admin','Admin')
    )
    
    user_type = models.CharField(max_length=10,choices=USER_TYPE,default='User')


class Event(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()

    def __str__(self) -> str:
        return f"{self.event_type} - {self.timestamp}"