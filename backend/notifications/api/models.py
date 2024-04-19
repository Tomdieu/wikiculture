from django.db import models


# Create your models here.

class User(models.Model):
    user_id = models.IntegerField(unique=True)

    def __str__(self):
        return f"User {self.user_id}"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user.user_id} : Message : {self.message} Timestamp : {self.timestamp}"
