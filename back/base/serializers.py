from dataclasses import field
import json
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Form, FormAnswer, Profile
from django.core.serializers import serialize




class ProfileSerializer(ModelSerializer):
    class Meta:
        model       = Profile
        fields      = "__all__"
        
        
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