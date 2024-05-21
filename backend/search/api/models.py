from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    image = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    date_joined = models.DateTimeField()
    user_type = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.username} - {self.user_type}"


class Article(models.Model):
    STATUS = (("draft", "Draft"), ("published", "Published"))

    id = models.IntegerField(primary_key=True)
    slug = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    icon = models.CharField(max_length=10, default="", null=True, blank=True)
    cover_image = models.CharField(max_length=1000, blank=True, null=True)
    content = models.TextField(blank=True,null=True)
    tags = models.CharField(max_length=255)
    approved = models.BooleanField(default=False)
    categories = models.CharField(max_length=255)
    is_published = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS, default="draft")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.title} - {self.author}"
