from django.db import models
from taggit.managers import TaggableManager
from django.utils.text import slugify
import uuid
from ckeditor.fields import RichTextField

from simple_history.models import HistoricalRecords

from django.utils import timezone

from django.conf import settings

import os

import nltk
nltk_data_dir = os.path.join(settings.BASE_DIR,"nltk_data")

nltk.data.path.append(nltk_data_dir)

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk
from nltk.sentiment import SentimentIntensityAnalyzer
from collections import Counter


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
    content = RichTextField(blank=True,null=True,default="")
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

    def record_m2m_history(self):
        categories = list(self.categories.all())
        tags = list(self.tags.all())
        history_instance = self.history.latest()
        history_instance.history_change_reason = 'Updated M2M fields'
        history_instance.save()
        history_instance.categories = categories
        history_instance.tags = tags
        history_instance.save()

    def get_similarities(self):
        return self.similarities.all()
    
    def preprocess_text(self, text):
        stop_words = set(stopwords.words('english'))
        word_tokens = word_tokenize(text)
        filtered_words = [word for word in word_tokens if word.lower() not in stop_words]
        return filtered_words

    def tokenize_sentences(self):
        return sent_tokenize(self.content)

    def tokenize_words(self):
        return word_tokenize(self.content)

    def pos_tagging(self):
        tokens = self.tokenize_words()
        return pos_tag(tokens)

    def named_entity_recognition(self):
        pos_tags = self.pos_tagging()
        return ne_chunk(pos_tags)
    
    def lemmatize_words(self):
        lemmatizer = WordNetLemmatizer()
        tokens = self.tokenize_words()
        lemmatized_words = [lemmatizer.lemmatize(token) for token in tokens]
        return lemmatized_words

    def extract_keywords(self):
        tokens = self.preprocess_text(self.content)
        return Counter(tokens).most_common(10)

    def extract_named_entities(self):
        named_entities = self.named_entity_recognition()
        entities = []
        for chunk in named_entities:
            if hasattr(chunk, 'label'):
                entities.append(' '.join(c[0] for c in chunk))
        return entities

    def sentiment_analysis(self):
        sia = SentimentIntensityAnalyzer()
        return sia.polarity_scores(self.content)
    
    def get_text_analysis(self):
        analysis = {
            "tokens": self.tokenize_words(),
            "sentences": self.tokenize_sentences(),
            "pos_tags": self.pos_tagging(),
            "named_entities": self.extract_named_entities(),
            "lemmatized_words": self.lemmatize_words(),
            "keywords": self.extract_keywords(),
            "sentiment": self.sentiment_analysis(),
        }
        return analysis
    
    def save(self, *args, **kwargs):
        # if not self.slug:
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

        analysis_data = self.get_text_analysis()
        ArticleAnalysis.objects.update_or_create(
            article=self,
            defaults={
                'keywords': analysis_data['keywords'],
                'named_entities': analysis_data['named_entities'],
                'sentiment': analysis_data['sentiment'],
            }
        )

        from .lib import link_related_articles

        self.content = link_related_articles(self.content, analysis_data['named_entities'])
        super().save(update_fields=['content'])
        print("Text Analysis:", analysis_data)

class CulturalSimilarity(models.Model):
    article = models.ForeignKey(Article, related_name='similarities', on_delete=models.CASCADE)
    village = models.ForeignKey(Village, related_name='similarities', on_delete=models.CASCADE)
    similarity_percentage = models.FloatField()

    class Meta:
        unique_together = ('article', 'village')

    def __str__(self):
        return f"{self.article.title} -> {self.village.name} : {self.similarity_percentage}%"

class ArticleAnalysis(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE, related_name='analysis')
    keywords = models.JSONField()  # Store keywords as JSON
    named_entities = models.JSONField()  # Store named entities as JSON
    sentiment = models.JSONField()  # Store sentiment as JSON

    def __str__(self):
        return f"Analysis for {self.article.title}"


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
