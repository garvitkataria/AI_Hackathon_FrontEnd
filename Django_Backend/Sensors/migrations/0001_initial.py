# Generated by Django 2.1.2 on 2018-10-27 20:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Crop_Type', '0003_auto_20181027_2006'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sensor_type', models.CharField(choices=[('WL', 'Water Level'), ('WL', 'Turbidity Sensor'), ('Temp', 'Temperature'), ('SM', 'Soil Moisture'), ('HDT', 'Humidity'), ('Act', 'Actuator')], default='Temp', max_length=20)),
                ('location', models.FloatField(default=0.0)),
                ('latitude', models.FloatField(default=0.0)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('crop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='crop', to='Crop_Type.Crop')),
            ],
        ),
        migrations.CreateModel(
            name='SensorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.FloatField(default=0.0)),
                ('parent_sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Sensors.Sensor')),
            ],
        ),
    ]
