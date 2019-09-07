from django.conf.urls import url
from .views import SensorView, SensorDataView

app_name = 'Sensors'

urlpatterns = [
	url(r'^data/$', SensorDataView.as_view(), name='sensor_data_view'),
	url(r'^$', SensorView.as_view(), name='sensor_view'),
	]