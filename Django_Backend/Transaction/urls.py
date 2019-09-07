from django.conf.urls import url
from .views import TransactionView

app_name = 'Transaction'

urlpatterns = [
	url(r'^$', TransactionView.as_view(), name='transaction_view'),
	]