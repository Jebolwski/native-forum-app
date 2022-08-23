from http.client import HTTPResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Form, Profile
from .serializers import FormSerializer, ProfileSerializer
from django.shortcuts import get_object_or_404

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


#!Creating a form.
@api_view(['GET','POST'])
def CreateForm(request):
    serializer = FormSerializer(data = request.data, many=False)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


#!Getting all the forms.
@api_view(['GET'])
def Forms(request):
    forms = Form.objects.all().order_by('-edit')
    serializer = FormSerializer(forms, many=True)
    return Response(serializer.data)

#!Deleting a form. 
@api_view(['GET','POST'])
def DeleteForm(request,pk):
    form = Form.objects.get(id=pk)
    form.delete()
    return Response("OK")


#!Getting a specific profile.
@api_view(['GET'])
def GetProfile(request,pk):
    profile = Profile.objects.get(user=User.objects.get(id=pk))
    serializer = ProfileSerializer(profile,many=False)
    return Response(serializer.data)


#!Getting forms of a specific profile.
@api_view(['GET'])
def ProfileForms(request,pk):
    profile = Profile.objects.get(user=User.objects.get(id=pk))
    forms = Form.objects.filter(profile=profile).order_by("-edit")
    serializer = FormSerializer(forms, many=True)
    return Response(serializer.data)


#!Getting forms of a specific profile.
@api_view(['POST','PUT'])
def EditProfile(request,pk):
    profile = Profile.objects.get(id=pk)
    if request.method=="PUT":
        if request.data.get("pp_mi")=="1":
            profile.profile_pic = request.data.get('photo')
            profile.save()
        elif request.data.get("pp_mi")=="0":
            profile.background_pic = request.data.get('photo')
            profile.save()
        return Response("Messi")
    return Response("Put değil")


#!Like / Dislike a specific form.
@api_view(['POST'])
def LikeDislikeForm(request,pk):
    form = Form.objects.get(id=pk)
    user = request.data.get("user_id")
    profile = Profile.objects.get(user=user)
    if not profile in form.like.all():
        form.like.add(profile)
        return Response(len(form.like.all()))
    else:
        form.like.remove(profile)
        return Response(len(form.like.all()))
    return Response("assad")
    
