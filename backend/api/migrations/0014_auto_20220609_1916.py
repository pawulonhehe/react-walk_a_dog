# Generated by Django 3.2.13 on 2022-06-09 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20220609_1901'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dograting',
            old_name='ratings',
            new_name='value',
        ),
        migrations.RenameField(
            model_name='trainerrating',
            old_name='ratings',
            new_name='value',
        ),
    ]
