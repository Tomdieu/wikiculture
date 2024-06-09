from django.db import models
from taggit.managers import TaggableManager
from django.utils.text import slugify
import uuid
from ckeditor.fields import RichTextField

from simple_history.models import HistoricalRecords

from django.utils import timezone


# Create your models here.


class User(models.Model):
    USER_TYPE = (("User", "User"), ("Moderator", "Moderator"), ("Admin", "Admin"))
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    bio = models.TextField(blank=True,null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    date_joined = models.DateTimeField()
    user_type = models.CharField(max_length=10, choices=USER_TYPE)

    def __str__(self):
        return f"{self.username} - {self.user_type}"
    


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    is_cultural = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return f"{self.name}"
    

class CulturalArea(models.Model):

    name = models.CharField(max_length=255,unique=True)
    description = RichTextField(blank=True,null=True)

    def __str__(self) -> str:
        return self.name
    
class Region(models.Model):
    name = models.CharField(max_length=255,unique=True)
    description = RichTextField(blank=True,null=True)
    cultural_area = models.ForeignKey(CulturalArea, on_delete=models.CASCADE,related_name='cultural_area')

    def __str__(self):
        return self.name
    
class Village(models.Model):
    name = models.CharField(max_length=255,unique=True)
    description = RichTextField(blank=True,null=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE,related_name='region')

    def __str__(self):
        return self.name

class Article(models.Model):

    slug = models.SlugField(max_length=255,blank=True,null=True)
    icon = models.CharField(max_length=10,default="",null=True,blank=True)
    title = models.CharField(max_length=255, default="Untitled")
    cover_image = models.CharField(max_length=1000,blank=True,null=True)
    content = RichTextField(blank=True,null=True)
    tags = TaggableManager(blank=True,related_name="tagged_articles")
    village = models.ForeignKey(Village,on_delete=models.CASCADE,null=True,blank=True)
    approved = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category, blank=True, related_name="articles")
    is_published = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)
    updated = models.BooleanField(default=False)
    history = HistoricalRecords(user_model=User)

    class Meta:
        ordering = ("-created_at",)
        verbose_name_plural = "Articles"

    def __str__(self):
        return f"{self.title} by {self.author}"

    def save(self, *args, **kwargs):
        # if not self.slug:
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class UserArticleInteraction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="articles_interactions")
    article = models.ForeignKey(Article, on_delete=models.CASCADE,related_name="articles_interactions")
    timestamp = models.DateTimeField(auto_now_add=True)
    interaction_type = models.CharField(max_length=50, choices=(('view', 'View'), ('like', 'Like')))

    def __str__(self):
        return f"{self.user.username} - {self.article.title} ({self.interaction_type})"


class ArticleRevision(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="revisions"
    )
    content = RichTextField()
    editor = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Revision of {self.article.title} by {self.editor.username}"


class ArticleLike(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    ip_address = models.CharField(max_length=45, blank=True)
    user_agent = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user} Liked {self.article}"
    
    class Meta:
        unique_together = ('article','user','ip_address','user_agent',)


class ReadingTime(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True,null=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    ip_address = models.CharField(max_length=45, blank=True)
    user_agent = models.TextField(blank=True)

    total_time_spent = models.PositiveIntegerField(
        default=0
    )  # Store total time in seconds
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"{self.user} spent {self.total_time_spent} seconds reading {self.article}"
        )


class ArticleVistors(models.Model):

    article = models.ForeignKey(Article,on_delete=models.CASCADE,related_name="visitors")
    date = models.DateField(default=timezone.now)
    ip_address = models.CharField(max_length=45, blank=True)
    user_agent = models.CharField(max_length=255)

    class Meta:
        unique_together = ('article', 'date','user_agent','ip_address') 

        

    def __str__(self):
        return f"{self.user_agent}:{self.ip_address} visited {self.article} on {self.date}"


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()

    def __str__(self) -> str:
        return f"{self.event_type} - {self.timestamp}"
