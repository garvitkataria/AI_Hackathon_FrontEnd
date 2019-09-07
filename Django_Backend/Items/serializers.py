from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from AuthUser.serializers import UserSerializer
from AuthUser.models import User
from .models import Item

class ItemSerializer(ModelSerializer):

	seller = UserSerializer()
	class Meta:
		model = Item
		fields = [
			'id',
			'seller',
			'product_title',
			'product_description',
			'product_price',
			'product_quantity',
			'itemImage',
			'longitude',
			'latitude',
			'sold',
			'created_on',
			]
	read_only_fields = ['id', 'created_on']