from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from AuthUser.serializers import UserSerializer
from AuthUser.models import User
from Items.models import Item
from Items.serializers import ItemSerializer
from .models import Transaction

class TransactionSerializer(ModelSerializer):
	buyer = UserSerializer()
	item = ItemSerializer()
	class Meta:
		model = Transaction
		fields = [
			'id',
			'buyer',
			'item',
			'status',
			'paymentOption',
			'created_on'
			]
	read_only_fields = ['id', 'created_on']