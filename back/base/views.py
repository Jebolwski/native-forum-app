from cgitb import reset
from django.http import HttpResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import Form, FormAnswer, Profile
from .serializers import FormAnswerSerializer, FormSerializer, ProfileSerializer
from django.shortcuts import get_object_or_404
import json


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
    a = Form.objects.create(
        profile=Profile.objects.get(id=request.data.get("profile")),
        body=request.data.get("body"),
        image=request.data.get("photo"),
    )
    serializer = FormSerializer(a,many=False)
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


#!Deleting a form answer. 
@api_view(['POST'])
def DeleteFormAnswer(request,pk):
    form = get_object_or_404(FormAnswer,id=pk)
    form.delete()
    return Response("OK")



#!Getting a specific profile.
@csrf_exempt
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



#!Like / Dislike a specific form answer.
@api_view(['POST'])
def LikeDislikeFormAnswer(request,pk):
    formanswer = FormAnswer.objects.get(id=pk)
    user = request.data.get("user_id")
    profile = Profile.objects.get(user=user)
    if not profile in formanswer.formanswerlike.all():
        formanswer.formanswerlike.add(profile)
        return Response(len(formanswer.formanswerlike.all()))
    else:
        formanswer.formanswerlike.remove(profile)
        return Response(len(formanswer.formanswerlike.all()))



#!Answer a specific form.
@api_view(['POST'])
def AnswerForm(request,pk):
    form = Form.objects.get(id=pk)
    print(request.data)
    a = FormAnswer.objects.create(
        body=request.data.get("body"),
        form=Form.objects.get(id=request.data.get("form")),
        parent=None,
        image = request.data.get("photo"),
        profile = Profile.objects.get(id=request.data.get("profile"))
    )
    return Response("Oluştu.")


#!Answer a specific forms answer.
@api_view(['POST'])
def AnswerFormAnswer(request,pk):
    print(request.data)
    a = FormAnswer.objects.create(
        body=request.data.get("body"),
        form=Form.objects.get(id=request.data.get("parent_id")),
        parent=FormAnswer.objects.get(id = request.data.get("form_id")),
        image = request.data.get("photo"),
        profile = Profile.objects.get(id=request.data.get("profile_id"))
    )
    return Response("Oluştu.")


#!A specific forms answers.
@api_view(['GET'])
def FormAnswers(request,pk):
    form = FormAnswer.objects.filter(form = get_object_or_404(Form,id=pk), parent = None)
    serializer = FormAnswerSerializer(form,many=True)
    return HttpResponse(json.dumps(serializer.data))

    
#!A specific form answer answers.
@api_view(['GET'])
def FormAnswerAnswers(request,pk):
    form = FormAnswer.objects.filter(parent = get_object_or_404(FormAnswer,id=pk))
    serializer = FormAnswerSerializer(form,many=True)
    return HttpResponse(json.dumps(serializer.data))

#!A specific profiles liked forms.
@api_view(['GET'])
def ProfilesLikedForms(request,pk):
    profile = get_object_or_404(Profile,user=get_object_or_404(User,id=pk))
    form_answers = []
    answer_all = FormAnswer.objects.all()
    for i in answer_all:
        if profile in i.formanswerlike.all():
            form_answers.append(get_object_or_404(FormAnswer,id=i.id))
    
    
    forms = []
    form_all = Form.objects.all()
    for i in form_all:
        if profile in i.like.all():
            forms.append(get_object_or_404(Form,id=i.id))

    answer_serializer = FormAnswerSerializer(answer_all,many=True)
    form_serializer = FormSerializer(form_all,many=True)
    return Response(form_serializer.data)


#!A specific profiles forms with media.
@api_view(['GET'])
def ProfilesMediaForms(request,pk):
    profile = get_object_or_404(Profile,user=get_object_or_404(User,id=pk))
    forms = Form.objects.filter(profile=profile).order_by('-create')
    dizi = []
    for i in forms:
        if i.image!=None and i.image!="":
            print(i.image)
            dizi.append(get_object_or_404(Form,id=i.id))
    print(dizi)
    form_serializer = FormSerializer(dizi,many=True)

    return Response(form_serializer.data)
