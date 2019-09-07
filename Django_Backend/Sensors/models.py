from django.conf import settings
from django.db import models
from Crop_Type.models import Crop

class Sensor(models.Model):
	crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='crop')
	sensor_types = (
        ('Water Level', 'Water Level'),
        ('Turbidity', 'Turbidity'),
        ('Temperature', 'Temperature'),
        ('Soil Moisture', 'Soil Moisture'), 
        ('Humidity', 'Humidity'),
        ('Actuator', 'Actuator')
	)
	sensor_type = models.CharField(max_length=20, choices=sensor_types, default='Temperature')
	longitude = models.FloatField(default=0.00)
	latitude = models.FloatField(default=0.00)
	created_on = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return str(self.id)+'--'+self.crop.__str__()+'--'+str(self.sensor_type)

class SensorData(models.Model):
    parent_sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE,related_name='parent_sensor')
    value = models.FloatField(default=70.00)
    min_value = models.FloatField(default=0.00)
    max_value = models.FloatField(default=100.00)
    created_on = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.parent_sensor.__str__() + " ===> " + str(self.value) 