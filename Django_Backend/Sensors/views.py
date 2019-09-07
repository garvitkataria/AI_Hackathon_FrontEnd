from rest_framework.views import APIView
from rest_framework.response import Response

from Crop_Type.models import Crop
from Crop_Type.serializers import CropSerializer
from .models import Sensor,SensorData
from .serializers import SensorSerializer,SensorDataSerializer
# from rest_framework.permissions import AllowAny

class SensorView(APIView):
	# permission_classes = (AllowAny, )

	def get(self, request, format=None):
		crop_id = request.GET.get('crop_id')
		print(crop_id)
		try:
			sensors = Sensor.objects.filter(crop__id=crop_id)
			print(sensors)
			serializer = SensorSerializer(sensors, many=True)
			return Response(serializer.data)
		except:
			return Response('Sensor does not exists.')
		
	def post(self, request, format=None):
		try:
			sensor = Sensor()
			sensor.crop = Crop.objects.get(id=request.data.get('crop_id'))
			sensor.sensor_type = request.data.get('sensor_type')
			sensor.longitude = request.data.get('longitude')
			sensor.latitude = request.data.get('latitude')
			sensor.save()
			print("sensor",sensor)
			serializer = SensorSerializer(sensor, many=False)
			return Response(serializer.data)
		except Exception as e:
			return Response(e)

class SensorDataView(APIView):
	# permission_classes = (AllowAny, )

	def get(self, request, format=None):
		sensor_id = request.GET.get('sensor_id')	
		try:
			sensors_data = SensorData.objects.filter(parent_sensor__id=sensor_id)
			serializer = SensorDataSerializer(sensors_data, many=True)
			return Response(serializer.data)
		except:
			return Response('Sensor does not exists.')
		
	def post(self, request, format=None):
		try:
			sensor_data = SensorData()
			sensor_data.parent_sensor = Sensor.objects.get(id=request.data.get('sensor_id'))
			sensor_data.value = request.data.get('value')
			sensor_data.min_value = request.data.get('min_value')
			sensor_data.max_value = request.data.get('max_value')
			sensor_data.save()
			print("sensor_data",sensor_data)
			serializer = SensorDataSerializer(sensor_data, many=False)
			return Response(serializer.data)
		except Exception as e:
			return Response(e)
