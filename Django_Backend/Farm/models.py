from django.db import models
from django.conf import settings

def image_upload_path(instance, filename):
	return "Farm/{0}".format(instance.farm_name, filename)

class Farm(models.Model):
	farmer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='farmer')
	farm_name = models.CharField(max_length=50, null=True, blank=True)
	about = models.TextField(null=True)
	longitude = models.FloatField(default=0.00)
	latitude = models.FloatField(default=0.00)
	created_on = models.DateTimeField(auto_now_add=True)
	farmImage = models.ImageField(upload_to=image_upload_path, default='farm.jpg')
	def __str__(self):
		return str(self.id)+'--'+ str(self.farmer.username)+'--'+str(self.farm_name)