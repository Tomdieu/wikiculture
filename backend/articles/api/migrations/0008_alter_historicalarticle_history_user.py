# Generated by Django 5.0.4 on 2024-05-09 19:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_article_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalarticle',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='api.user'),
        ),
    ]