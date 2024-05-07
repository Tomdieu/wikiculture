from django.db import models
import os

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


class FileCategory(models.TextChoices):
    VIDEO = 'Video'
    IMAGE = 'Image'
    DOCUMENT = 'Document'
    AUDIO = 'Audio'
    OTHER = 'Other'


class File(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    category = models.CharField(max_length=50, choices=FileCategory.choices,null=True,blank=True)
    file = models.FileField(upload_to='media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = os.path.basename(self.file.name)  # Set file name if not provided
        ext = os.path.splitext(self.file.name)[1].lower()  # Get file extension
        if ext in ['.mp4', '.avi', '.mov', '.mkv']:
            self.category = FileCategory.VIDEO
        elif ext in ['.jpg', '.jpeg', '.png', '.gif']:
            self.category = FileCategory.IMAGE
        elif ext in ['.pdf', '.doc', '.docx', '.txt']:
            self.category = FileCategory.DOCUMENT
        elif ext in ['.mp3', '.wav', '.flac']:
            self.category = FileCategory.AUDIO
        else:
            self.category = FileCategory.OTHER
        super().save(*args, **kwargs)