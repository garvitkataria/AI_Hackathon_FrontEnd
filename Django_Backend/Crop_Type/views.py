from rest_framework.views import APIView
from rest_framework.response import Response

from Farm.models import Farm
from Farm.serializers import FarmSerializer
from .models import Crop
from .serializers import CropSerializer
import requests
import base64
from django.core.files.base import ContentFile
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
			cropImage = request.data.get('cropImage')
			print(cropImage)

			r = requests.post("http://127.0.0.1:5000/", files={"cropImage": cropImage.read()})
			crop.cropImage.save("1.jpg",cropImage, save=True)

			data = r.json()
			print(data['data']['cropImageAnnotated'])
			crop.cropImageAnnotated.save("2.jpg", ContentFile(base64.b64decode(data['data']['cropImageAnnotated'])),save=True)
			# data['data']['altitude']
			crop.latitude = data['data']['latitude']
			crop.longitude = data['data']['longitude']
			crop.total_crops = data['data']['total_crops']
			crop.altitude = data['data']['altitude']
			# data['data']['total_crops']
			crop.save()
			# crop.longitude = request.data.get('longitude')
			# crop.latitude = request.data.get('latitude')
			print("crop",crop)
			# serializer = CropSerializer(crop, many=False)
			return Response("Done")
		except Exception as e:
			return Response(e)

