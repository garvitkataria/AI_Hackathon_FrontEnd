# Generated by Django 2.1.7 on 2019-09-27 13:10

import Farm.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Farm', '0009_auto_20181028_1619'),
    ]

    operations = [
        migrations.AddField(
            model_name='farm',
            name='heatMap',
            field=models.ImageField(default='farm.jpg', upload_to=Farm.models.image_upload_path_3),
        ),
        migrations.AddField(
            model_name='farm',
            name='scatterPlot',
            field=models.ImageField(default='farm.jpg', upload_to=Farm.models.image_upload_path_2),
        ),
    ]
