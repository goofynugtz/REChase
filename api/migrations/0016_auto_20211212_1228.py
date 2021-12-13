# Generated by Django 3.2.9 on 2021-12-12 06:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20211212_1226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teamleaderboard',
            name='teamPlayerOne',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='teamPlayerOne', to='api.player'),
        ),
        migrations.AlterField(
            model_name='teamleaderboard',
            name='teamPlayerTwo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='teamPlayerTwo', to='api.player'),
        ),
    ]
