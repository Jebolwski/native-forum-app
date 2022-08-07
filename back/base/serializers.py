from dataclasses import field
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Form




class FormSerializer(ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    class Meta:
        model       = Form
        fields      = "__all__"

    def get_username(self,form):
        username = Form.objects.get(id=form.id).user.username
        return username
