# Generated by Django 5.0.1 on 2024-05-18 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_article_cover_image_article_icon_user_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="bio",
            field=models.TextField(blank=True, null=True),
        ),
    ]
