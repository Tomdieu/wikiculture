# Generated by Django 5.0.4 on 2024-05-09 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_article_bio_historicalarticle_bio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='historicalarticle',
            name='bio',
        ),
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.TextField(blank=True, null=True),
        ),
    ]
