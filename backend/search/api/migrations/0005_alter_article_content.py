# Generated by Django 5.0.1 on 2024-05-18 23:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_article_is_published"),
    ]

    operations = [
        migrations.AlterField(
            model_name="article",
            name="content",
            field=models.TextField(blank=True, null=True),
        ),
    ]