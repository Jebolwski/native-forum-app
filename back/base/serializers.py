from dataclasses import field
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Form




class NoteSerializer(ModelSerializer):

    class Meta:
        model       = Form
        fields      = "__all__"
