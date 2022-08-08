from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Form
from .serializers import FormSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        
        token['username'] = user.username
        token['email'] = user.email
        token['is_authenticated'] = user.is_authenticated
        token['is_superuser'] = user.is_superuser

        
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET','POST'])
def CreateForm(request):
    serializer = FormSerializer(data = request.data, many=False)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def Forms(request):
    forms = Form.objects.all().order_by('-edit')
    serializer = FormSerializer(forms, many=True)
    for form in forms:
        print(form)
    return Response(serializer.data)

@api_view(['GET','POST'])
def DeleteForm(request,pk):
    form = Form.objects.get(id=pk)
    form.delete()
    return Response("OK")

