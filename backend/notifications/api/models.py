from django.db import models


# Create your models here.

class User(models.Model):
    user_id = models.IntegerField(unique=True)

    def __str__(self):
        return f"User : {self.user_id}"


class Notification(models.Model):
    NOTIFICATION_TYPE = [
        ('default', 'default'),
        ('article', 'article')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    type = models.CharField(max_length=20, default='article', choices=NOTIFICATION_TYPE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user.user_id} : Message : {self.message} Timestamp : {self.timestamp}"
