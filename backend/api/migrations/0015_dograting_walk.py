# Generated by Django 3.2.13 on 2022-06-09 17:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20220609_1916'),
    ]

    operations = [
        migrations.AddField(
            model_name='dograting',
            name='walk',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.slot', verbose_name='Spacer'),
        ),
    ]