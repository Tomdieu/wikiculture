# Generated by Django 5.0.4 on 2024-06-04 00:47

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_culturalarea_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='region',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='village',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]
