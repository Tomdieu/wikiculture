# Generated by Django 5.0.1 on 2024-05-31 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_article_village'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='village',
            field=models.CharField(default='', max_length=255),
        ),
    ]
