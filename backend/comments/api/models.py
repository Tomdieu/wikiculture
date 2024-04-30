from django.db import models

# Create your models here.

class User(models.Model):
    USER_TYPE = (
        ('User', 'User'),
        ('Moderator','Moderator'),
        ('Admin', 'Admin')
    )
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    date_joined = models.DateTimeField()
    user_type = models.CharField(max_length=10, choices=USER_TYPE)

    def __str__(self):
        return f"{self.username} - {self.user_type}"


class Article(models.Model):

    id = models.IntegerField(primary_key=True)

    def __str__(self) -> str:
        return f"Article : {self.id}"


class Comments(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE,related_name='comments')
    content = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True,related_name='replies')
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def __str__(self):
        return f"{self.author} commented : {self.content} on article :{self.article}"
