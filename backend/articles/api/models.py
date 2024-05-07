from django.db import models
from taggit.managers import TaggableManager
from django.utils.text import slugify
import uuid
from ckeditor.fields import RichTextField

from simple_history.models import HistoricalRecords


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
    image = models.CharField(max_length=255,blank=True,null=True)
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
        return f"{self.name}"


class Article(models.Model):
    STATUS = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    content = RichTextField()
    tags = TaggableManager()
    approved = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category, blank=True, related_name='categories')
    status = models.CharField(max_length=20, choices=STATUS, default='draft')
    author = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated = models.BooleanField(default=False)
    history = HistoricalRecords()

    class Meta:
        ordering = ('-created_at',)
        verbose_name_plural = 'Articles'

    def __str__(self):
        return f"{self.title} by {self.author}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        
class ArticleRevision(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='revisions')
    content = RichTextField()
    editor = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Revision of {self.article.title} by {self.editor.username}"


class ArticleLike(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user} Liked {self.article}"

class ReadingTime(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    
    ip_address = models.CharField(max_length=45,blank=True)
    user_agent = models.TextField(blank=True)
    
    total_time_spent = models.PositiveIntegerField(default=0)  # Store total time in seconds
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} spent {self.total_time_spent} seconds reading {self.article}"
    
# class ArticleView(models.)


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()

    def __str__(self) -> str:
        return f"{self.event_type} - {self.timestamp}"
