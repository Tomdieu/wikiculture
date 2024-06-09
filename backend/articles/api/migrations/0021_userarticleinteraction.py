# Generated by Django 5.0.4 on 2024-06-09 23:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0020_alter_region_description_alter_village_description"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserArticleInteraction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "interaction_type",
                    models.CharField(
                        choices=[("view", "View"), ("like", "Like")], max_length=50
                    ),
                ),
                (
                    "article",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="articles_interactions",
                        to="api.article",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="articles_interactions",
                        to="api.user",
                    ),
                ),
            ],
        ),
    ]
