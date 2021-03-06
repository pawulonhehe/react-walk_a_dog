# Generated by Django 3.2.13 on 2022-06-09 17:01

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0012_auto_20220609_1858'),
    ]

    operations = [
        migrations.AddField(
            model_name='dograting',
            name='dog',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ratings', to='api.dog', verbose_name='Pies'),
        ),
        migrations.CreateModel(
            name='TrainerRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ratings', models.FloatField(validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)])),
                ('comment', models.TextField(blank=True, default='', null=True, verbose_name='Komentarz')),
                ('evaluator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Oceniający')),
                ('trainer', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='trainer_ratings', to=settings.AUTH_USER_MODEL, verbose_name='Trener')),
            ],
        ),
    ]
