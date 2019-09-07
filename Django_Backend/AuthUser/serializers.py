from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import User

class UserSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = [
			'username',
			'first_name',
			'last_name',
			'email',
			'mobile_no',
			'avatar',
			'password',
			'is_farmer'
			]
		extra_kwargs = {
			'password': {'write_only':True}
		}