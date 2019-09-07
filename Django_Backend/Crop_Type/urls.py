from django.conf.urls import url
from .views import CropView

app_name = 'Crop_Type'

urlpatterns = [
	url(r'^$', CropView.as_view(), name='crop_view'),
	]