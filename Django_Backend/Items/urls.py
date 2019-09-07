from django.conf.urls import url
from .views import ItemView, AllItemView

app_name = 'Items'

urlpatterns = [
	url(r'^$', ItemView.as_view(), name='item_view'),
	url(r'^all/$', AllItemView.as_view(), name='all_item_view')
	]