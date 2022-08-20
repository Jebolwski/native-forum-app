from email.policy import default
from django.db import models
from django.contrib.auth.models import User



class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    bio = models.TextField(max_length=160,null=False,blank=False,default="No info was given.")
    profile_pic = models.ImageField(default="default_pp.png",upload_to="profile_pic",null=True,blank=True)
    background_pic = models.ImageField(default="default_bgp.png",upload_to="background_pic",null=True,blank=True)
    followers = models.ManyToManyField("self",related_name="profile_followers",blank=True)
    create = models.DateTimeField(auto_now=True)
    edit = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user.username + " ---------- " + self.bio

class Form(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    body = models.TextField(max_length=160,null=False,blank=False)
    image = models.ImageField(upload_to='profilePhotos',null=False,blank=False,default='default.jpg')
    goruldu = models.ManyToManyField(User,related_name='goruldu',blank=True)
    like = models.ManyToManyField(User,related_name='form_like',blank=True)
    create = models.DateTimeField(auto_now=True)
    edit = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " ---------- " + self.body




class FormAnswer(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    body = models.TextField(max_length=160,null=False,blank=False)
    image = models.ImageField(upload_to="profilePhotos",null=False,blank=False,default="default.jpg")
    formanswerlike = models.ManyToManyField(User,related_name='form_answer_like')
    create = models.DateTimeField(auto_now=True)
    edit = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " ---------- " + self.body