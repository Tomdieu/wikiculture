# Generated by Django 5.0.4 on 2024-05-09 09:47

import ckeditor.fields
import taggit.managers
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_image_articlerevision'),
        ('taggit', '0006_rename_taggeditem_content_type_object_id_taggit_tagg_content_8fc721_idx'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='cover_image',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='icon',
            field=models.CharField(blank=True, default='', max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='historicalarticle',
            name='cover_image',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='historicalarticle',
            name='icon',
            field=models.CharField(blank=True, default='', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='content',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.CharField(default='Untitled', max_length=255),
        ),
        migrations.AlterField(
            model_name='article',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name='historicalarticle',
            name='content',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='historicalarticle',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='historicalarticle',
            name='title',
            field=models.CharField(default='Untitled', max_length=255),
        ),
        migrations.AlterField(
            model_name='historicalarticle',
            name='updated_at',
            field=models.DateTimeField(blank=True, editable=False, null=True),
        ),
    ]
