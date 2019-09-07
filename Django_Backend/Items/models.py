from django.db import models
from django.conf import settings

def image_upload_path(instance, filename):
	return "Item/{0}".format(instance.product_title, filename)

class Item(models.Model):
	seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='seller')
	product_title = models.CharField(max_length=50, null=False, blank=False)
	product_description = models.TextField(null=True , blank=True)
	product_price = models.FloatField(default=50.00)
	product_quantity = models.FloatField(default=50.00)
	longitude = models.FloatField(default=0.00)
	latitude = models.FloatField(default=0.00)
	created_on = models.DateTimeField(auto_now_add=True)
	itemImage = models.ImageField(upload_to=image_upload_path, default='wheat.jpg')
	sold = models.BooleanField(default=False)
	def __str__(self):
		return str(self.id)+'--'+ str(self.seller.username)+'--'+str(self.product_title)