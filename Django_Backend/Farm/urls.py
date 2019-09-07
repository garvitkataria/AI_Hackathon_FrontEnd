from django.conf.urls import url
from .views import FarmView

app_name = 'Farm'

urlpatterns = [
	url(r'^$', FarmView.as_view(), name='farm_view'),
	]