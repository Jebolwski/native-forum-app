from dataclasses import field
import json
from this import d
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Form, FormAnswer, Profile
from django.core.serializers import serialize




class ProfileSerializer(ModelSerializer):

    username = serializers.SerializerMethodField('get_username')

    class Meta:
        model       = Profile
        fields      = "__all__"    

    def get_username(self,profile):
        username = profile.user.username
        return username    
        
class FormSerializer(ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    profileObj = serializers.SerializerMethodField('get_profile')
    answer_count = serializers.SerializerMethodField('get_answer_count')

    class Meta:
        model       = Form
        fields      = "__all__"

    def get_username(self,form):
        username = Form.objects.get(id=form.id).profile.user.username
        return username


    def get_profile(self, form):
       profile = Form.objects.get(id=form.id).profile
       return ProfileSerializer(profile, many=False).data

    def get_id(self,form):
        id = Form.objects.get(id=form.id).id
        return id

    def get_answer_count(self,form):
        count = len(FormAnswer.objects.filter(form=form))
        return count

class FormAnswerSerializer(ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    answer_count = serializers.SerializerMethodField('get_answer_count')
    profileObj = serializers.SerializerMethodField('get_profile')
    parents = serializers.SerializerMethodField('parent_answer')


    class Meta:
        model       = FormAnswer
        fields      = "__all__"

    def parent_answer(self,formanswer):
        dizi = []
        while formanswer.parent != None and formanswer.profile.user.username not in dizi:
            dizi.append(formanswer.profile.user.username)
            formanswer=formanswer.parent
        if formanswer.form.profile.user.username:
            dizi.append(formanswer.form.profile.user.username)
            
        return dizi
    
    

    
    def get_answer_count(self,formanswer):
        count = len(FormAnswer.objects.filter(parent=formanswer))
        return count

    def get_username(self,formanswer):
        username = formanswer.profile.user.username
        return username

    def get_profile(self, formanswer):
       profile = formanswer.profile
       return ProfileSerializer(profile, many=False).data