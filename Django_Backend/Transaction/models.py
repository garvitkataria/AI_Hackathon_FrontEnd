from django.db import models
from django.conf import settings
from Items.models import Item

class Transaction(models.Model):
	buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='buyer')
	item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item')
	STATUS = (
        ('Confirmed', 'Confirmed'),
        ('Packed', 'Packed'),
        ('Shipped', 'Shipped'),
		('Delivered', 'Delivered')
	)
	status = models.CharField(max_length=20, choices=STATUS, default='CNF')
	PAYMENT_OPTIONS= (
        ('Cash On Delivery', 'Cash On Delivery'),
        ('Net Banking', 'Net Banking'),
        ('Paytm', 'Paytm'),
		('Credit/Debit Card', 'Credit/Debit Card')
	)
	paymentOption = models.CharField(max_length=20, choices=PAYMENT_OPTIONS, default='COD')
	created_on = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return str(self.id)+'--'+ str(self.item.seller.username)+'--'+str(self.buyer.username)