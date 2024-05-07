from django.db import models


# Create your models here.


class User(models.Model):
    USER_TYPE = (("User", "User"), ("Moderator", "Moderator"), ("Admin", "Admin"))
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    image = models.CharField(max_length=255,blank=True,null=True)
    date_joined = models.DateTimeField()
    user_type = models.CharField(max_length=10, choices=USER_TYPE)

    def __str__(self):
        return f"{self.username} - {self.user_type}"


class Notification(models.Model):
    NOTIFICATION_TYPE = [("default", "default"), ("article", "article")]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.TextField()
    type = models.CharField(max_length=20, default="article", choices=NOTIFICATION_TYPE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user.user_id} : Message : {self.message} Timestamp : {self.timestamp}"
