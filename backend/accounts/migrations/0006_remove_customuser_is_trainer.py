# Generated by Django 3.2.13 on 2022-05-23 16:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20220520_1546'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_trainer',
        ),
    ]
