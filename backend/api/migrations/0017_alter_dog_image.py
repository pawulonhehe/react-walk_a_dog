# Generated by Django 3.2.13 on 2022-06-09 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_dog_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dog',
            name='image',
            field=models.ImageField(blank=True, default='', upload_to='dog_images', verbose_name='Zdjęcie profilowe'),
        ),
    ]