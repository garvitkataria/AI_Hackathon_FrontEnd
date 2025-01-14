# Generated by Django 2.1.2 on 2018-10-27 19:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Farm', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Crops',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('crop_type', models.CharField(choices=[('1', 'Kharif crops'), ('2', 'Rabi Crops'), ('3', 'Zaid Crop'), ('4', 'Rice'), ('5', 'Wheat'), ('6', 'Pulses'), ('7', 'Sugarcane'), ('8', 'Cotton'), ('9', 'Groundnut'), ('10', 'Tea'), ('11', 'Coffee')], default='1', max_length=20)),
                ('location', models.FloatField()),
                ('latitude', models.FloatField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('farm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='farm', to='Farm.Farm')),
            ],
        ),
    ]
