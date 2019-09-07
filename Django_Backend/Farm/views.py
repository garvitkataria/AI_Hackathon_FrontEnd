from rest_framework.views import APIView
from rest_framework.response import Response

from AuthUser.models import User
from AuthUser.serializers import UserSerializer
from .models import Farm
from .serializers import FarmSerializer
# from rest_framework.permissions import AllowAny

class FarmView(APIView):
	# permission_classes = (AllowAny, )

	def get(self, request, format=None):
		username = request.GET.get('username')
		print(username)
		try:
			farms = Farm.objects.filter(farmer__username=username)
			print(farms)
			serializer = FarmSerializer(farms, many=True)
			return Response(serializer.data)
		except:
			return Response('Farm does not exists.')
		
	def post(self, request, format=None):
		try:
			farm = Farm()
			farm.farmer = User.objects.get(username=request.data.get('farmer_username'))
			farm.farm_name = request.data.get('farm_name')
			farm.about = request.data.get('about')
			farm.longitude = request.data.get('longitude')
			farm.latitude = request.data.get('latitude')
			farm.save()
			print("farm",farm)
			serializer = FarmSerializer(farm, many=False)
			return Response(serializer.data)
		except Exception as e:
			return Response(e)


