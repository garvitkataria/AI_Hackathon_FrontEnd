from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from Farm.serializers import FarmSerializer
from Farm.models import Farm
from .models import Crop

class CropSerializer(ModelSerializer):

	farm = FarmSerializer()
	class Meta:
		model = Crop
		fields = [
			'id',
			'farm',
			'crop_type',
			'cropImage',
			'cropImageAnnotated',
			'longitude',
			'latitude',
			'created_on'
			]
	read_only_fields = ['id', 'created_on']