# Generated by Django 5.0.4 on 2024-06-02 21:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_articlevistors_user_agent'),
    ]

    operations = [
        migrations.AddField(
            model_name='articlelike',
            name='ip_address',
            field=models.CharField(blank=True, max_length=45),
        ),
        migrations.AddField(
            model_name='articlelike',
            name='user_agent',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='articlelike',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AlterUniqueTogether(
            name='articlevistors',
            unique_together={('article', 'date', 'user_agent', 'ip_address')},
        ),
    ]
