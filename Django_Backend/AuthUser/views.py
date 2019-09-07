from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

class UserView(APIView):
	permission_classes = (AllowAny, )

	def get(self, request, format=None):
		print("username")
		username = request.GET.get('username')
		print(username)
		try:
			serializer = UserSerializer(User.objects.get(username=username), many=False)
			return Response(serializer.data)
		except:
			return Response('User does not exists.')
		
	def post(self, request, format=None):
		try:
			user = User()
			user.username = request.data.get('username')
			user.first_name = request.data.get('first_name')
			user.last_name = request.data.get('last_name')
			user.email = request.data.get('email')
			user.mobile_no = request.data.get('mobile_no')
			user.is_faculty = request.data.get('is_faculty')
			user.set_password(request.data.get('password'))
			user.save()
			serializer = UserSerializer(user,many=False)
			return Response(serializer.data)
		except Exception as e:
			return Response(e)


