from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from AuthUser.serializers import UserSerializer
from AuthUser.models import User
from Farm.models import Farm

class FarmSerializer(ModelSerializer):

	farmer = UserSerializer()
	class Meta:
		model = Farm
		fields = [
			'id',
			'farmer',
			'farm_name',
			'about',
			'farmImage',
			'longitude',
			'latitude',
			'created_on'
			]
	read_only_fields = ['id', 'created_on']