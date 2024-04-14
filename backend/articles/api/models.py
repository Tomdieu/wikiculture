from django.db import models
from taggit.managers import TaggableManager
from django.utils.text import slugify
import uuid
from ckeditor.fields import RichTextField


# Create your models here.

class User(models.Model):
    USER_TYPE = (
        ('User', 'User'),
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


class Category(models.Model):
    name = models.CharField(max_length=255,unique=True)
    is_cultural = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self) -> str:
        return self.name


class Article(models.Model):
    STATUS = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    content = RichTextField()
    tags = TaggableManager()
    categories = models.ManyToManyField(Category, blank=True, related_name='categories')
    status = models.CharField(max_length=20, choices=STATUS, default='draft')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'Articles'

    def __str__(self):
        return f"{self.title} by {self.author}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class ArticleLike(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user} Liked {self.article}"
    
# class ArticleView(models.)


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()

    def __str__(self) -> str:
        return f"{self.event_type} - {self.timestamp}"
