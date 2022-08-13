from dataclasses import field
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Form, Profile
from datetime import datetime 


class FormSerializer(ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    class Meta:
        model       = Form
        fields      = "__all__"

    def get_username(self,form):
        username = Form.objects.get(id=form.id).user.username
        return username

    def get_timesince(self,form):
        time = Form.objects.get(id=form.id).edit.strftime("%d %B %Y")
        return time

    def get_id(self,form):
        id = Form.objects.get(id=form.id).id
        return id


class ProfileSerializer(ModelSerializer):
    class Meta:
        model       = Profile
        fields      = "__all__"