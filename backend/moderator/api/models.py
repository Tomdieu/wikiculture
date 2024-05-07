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
    image = models.CharField(max_length=255,blank=True,null=True)
    date_joined = models.DateTimeField()
    user_type = models.CharField(max_length=10, choices=USER_TYPE)

    def __str__(self):
        return f"{self.username} - {self.user_type}"
    

class Article(models.Model):
    
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    
    def __str__(self):
        return f"Article {self.title}"
    
    
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