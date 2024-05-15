from django.db import models


# Create your models here.


class User(models.Model):
    USER_TYPE = (("User", "User"), ("Moderator", "Moderator"), ("Admin", "Admin"))
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    bio = models.TextField(max_length=255, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    date_joined = models.DateTimeField()
    user_type = models.CharField(max_length=10, choices=USER_TYPE)

    def __str__(self):
        return f"{self.username} - {self.user_type}"


class Notification(models.Model):
    NOTIFICATION_TYPE = [
        ("default", "default"),
        ("article_approved", "article_approved"),
        ("article_rejected", "article_rejected"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.TextField()
    type = models.CharField(max_length=20, default="article", choices=NOTIFICATION_TYPE)
    data = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"User {self.user} : Message : {self.message} Timestamp : {self.timestamp}"
        )
