from django.db import models

from taggit.managers import TaggableManager


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
    STATUS = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    id = models.IntegerField(primary_key=True)
    slug = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    content = models.TextField()
    tags = TaggableManager()
    categories = models.CharField(max_length=255,
                                  help_text="Category of the article (e.g. Technology, Politics, etc.) `,` seperated "
                                            "by comma")
    status = models.CharField(max_length=20, choices=STATUS, default='draft')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def __str__(self) -> str:
        return f"{self.title} - {self.user}"


class Comments(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def __str__(self):
        return f"{self.author} commented : {self.content} on article :{self.article}"
