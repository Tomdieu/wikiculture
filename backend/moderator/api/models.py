from django.db import models

# Create your models here.

class User(models.Model):
    
    USER_TYPE = (
        ('User', 'User'),
        ('Moderator','Moderator'),
        ('Admin', 'Admin')
    )

    user_id = models.IntegerField(unique=True)
    user_type = models.CharField(max_length=25,choices=USER_TYPE)
    
    def __str__(self):
        return f"User {self.user_id}"
    
    
class Article(models.Model):
    
    article_id = models.IntegerField(unique=True)
    
    def __str__(self):
        return f"Article {self.article_id}"
    
    
class ModerationRecord(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    DECISION_CHOICES = (
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    decision = models.CharField(max_length=20, choices=DECISION_CHOICES)
    feedback = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f"{self.user} - {self.article} - {self.decision} - {self.timestamp}"