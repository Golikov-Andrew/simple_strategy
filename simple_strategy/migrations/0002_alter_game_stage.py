# Generated by Django 4.1.6 on 2023-11-06 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simple_strategy', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='stage',
            field=models.JSONField(null=True),
        ),
    ]
