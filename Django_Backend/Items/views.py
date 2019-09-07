from rest_framework.views import APIView
from rest_framework.response import Response

from AuthUser.serializers import UserSerializer
from AuthUser.models import User
from .models import Item
from .serializers import ItemSerializer
# from rest_framework.permissions import AllowAny

class ItemView(APIView):
	# permission_classes = (AllowAny, )

	def get(self, request, format=None):
		user = User.objects.get(username=request.GET.get('username'))
		print(user)
		try:
			items = Item.objects.filter(seller=user)
			print(items)
			serializer = ItemSerializer(items, many=True)
			return Response(serializer.data)
		except:
			return Response('items does not exists.')
		
	def post(self, request, format=None):
		try:
			item = Item()
			item.seller = User.objects.get(username=request.data.get('seller_username'))
			item.product_title = request.data.get('product_title')
			item.product_description = request.data.get('product_description')
			item.product_price = request.data.get('product_price')
			item.product_quantity = request.data.get('product_quantity')
			item.longitude = request.data.get('longitude')
			item.latitude = request.data.get('latitude')
			item.save()
			print("item",item)
			serializer = ItemSerializer(item, many=False)
			return Response(serializer.data)
		except Exception as e:
			return Response(e)

class AllItemView(APIView):
	# permission_classes = (AllowAny, )
	def get(self, request, format=None):
		try:
			items = Item.objects.all().filter(sold=False)
			serializer = ItemSerializer(items, many=True)
			return Response(serializer.data)
		except:
			return Response('items does not exists.')

