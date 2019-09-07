from rest_framework.views import APIView
from rest_framework.response import Response

from AuthUser.serializers import UserSerializer
from AuthUser.models import User
from Items.models import Item
from .models import Transaction
from .serializers import TransactionSerializer
# from rest_framework.permissions import AllowAny

class TransactionView(APIView):
	# permission_classes = (AllowAny, )
	def get(self, request, format=None):
		item = Item.objects.get(id=request.GET.get('item_id'))
		print(item)
		try:
			transactions = Transaction.objects.get(item=item)
			print(transactions)
			serializer = TransactionSerializer(transactions, many=False)
			return Response(serializer.data)
		except:
			return Response('Transactions does not exists.')
		
	def post(self, request, format=None):
		try:
			transaction = Transaction()
			transaction.buyer = User.objects.get(username=request.data.get('buyer_username'))
			item = Item.objects.get(id=request.data.get('item_id'))
			item.sold = True;
			item.save()
			transaction.item = item
			transaction.status = request.data.get('status')
			transaction.paymentOption = request.data.get('paymentOption')
			transaction.save()
			print("transaction",transaction)
			serializer = TransactionSerializer(transaction, many=False)
			return Response(serializer.data)
		except Exception as e:
			return Response(e)
