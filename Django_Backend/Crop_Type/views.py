from rest_framework.views import APIView
from rest_framework.response import Response

from Farm.models import Farm
from Farm.serializers import FarmSerializer
from .models import Crop
from .serializers import CropSerializer
# from rest_framework.permissions import AllowAny

class CropView(APIView):
	# permission_classes = (AllowAny, )

	def get(self, request, format=None):
		farm_id = request.GET.get('farm_id')
		print(farm_id)
		
		crops = Crop.objects.filter(farm__id=farm_id)
		print(crops)
		serializer = CropSerializer(crops, many=True)
		print("Test")
		return Response(serializer.data)
		try:
			# crops = Crop.objects.filter(farm__id=farm_id)
			print(crops)
			serializer = CropSerializer(crops, many=True)
			print(serializer)
			return Response(serializer.data)
		except:
			return Response('Crop does not exists.')
		
	def post(self, request, format=None):
		print(request.data)
		try:
			crop = Crop()
			crop.farm = Farm.objects.get(id=request.data.get('farm_id'))
			farmImage = request.data.get('farmImage')
			print(farmImage)
			crop.farmImage.save("1.jpg",request.data.get('farmImage'), save=True)
			crop.save()
			# crop.longitude = request.data.get('longitude')
			# crop.latitude = request.data.get('latitude')
			print("crop",crop)
			# serializer = CropSerializer(crop, many=False)
			return Response("Done")
		except Exception as e:
			return Response(e)

