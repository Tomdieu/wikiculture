# Generated by Django 5.0.4 on 2024-05-21 00:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_alter_region_cultural_area_alter_village_region"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="articlevistors",
            unique_together={("article", "date", "ip_address")},
        ),
        migrations.RemoveField(
            model_name="articlevistors",
            name="count",
        ),
    ]
