from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from Crop_Type.serializers import CropSerializer
from Crop_Type.models import Crop
from .models import Sensor, SensorData

class SensorSerializer(ModelSerializer):

	crop = CropSerializer(many=False, required=False)
	class Meta:
		model = Sensor
		fields = [
			'id',
			'crop',
			'sensor_type',
			'longitude',
			'latitude',
			'created_on'
			]
	read_only_fields = ['id', 'created_on']

class SensorDataSerializer(ModelSerializer):

	class Meta:
		model = SensorData
		fields = [
			'id',
			# 'parent_sensor',
			'value',
			'min_value',
			'max_value',
			'created_on'
			]
	read_only_fields = ['id', 'created_on']