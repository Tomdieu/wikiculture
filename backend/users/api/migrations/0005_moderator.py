# Generated by Django 5.0.1 on 2024-05-17 19:01

import django.contrib.auth.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_userpasswordresettoken_reset_at"),
    ]

    operations = [
        migrations.CreateModel(
            name="Moderator",
            fields=[],
            options={
                "proxy": True,
                "indexes": [],
                "constraints": [],
            },
            bases=("api.user",),
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
