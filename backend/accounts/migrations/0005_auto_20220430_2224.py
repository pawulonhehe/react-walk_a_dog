# Generated by Django 3.2.13 on 2022-04-30 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_userdetails'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='address',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='userdetails',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userdetails',
            name='image',
            field=models.ImageField(blank=True, upload_to='profile_images'),
        ),
        migrations.AddField(
            model_name='userdetails',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
