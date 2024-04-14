from django.db import models

# Create your models here.

class User(models.Model):

    user_id = models.IntegerField(unique=True)
    
class Article(models.Model):
    
    article_id = models.IntegerField(unique=True)
    
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