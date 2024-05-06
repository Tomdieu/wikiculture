# Generated by Django 5.0.1 on 2024-05-06 05:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=255)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('date_joined', models.DateTimeField()),
                ('user_type', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('slug', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('tags', models.CharField(max_length=255)),
                ('approved', models.BooleanField(default=False)),
                ('categories', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='draft', max_length=20)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='api.user')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]
