from django.db import models
from django.contrib.auth.models import User

class Forum(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    body = models.TextField(max_length=160,null=False,blank=False)
    image = models.ImageField(upload_to="profilePhotos",null=False,blank=False,default="default.jpg")
    create = models.DateTimeField(auto_now=True)
    edit = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " ---------- " + self.body