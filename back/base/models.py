from email.policy import default
from django.db import models
from django.contrib.auth.models import User
from mptt.models import MPTTModel, TreeForeignKey
import mptt


class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    bio = models.TextField(max_length=160,null=False,blank=False,default="No info was given.")
    profile_pic = models.ImageField(default="profile_pic/default_pp.png",upload_to="profile_pic",null=False,blank=False)
    background_pic = models.ImageField(default="background_pic/default_bgp.png",upload_to="background_pic",null=False,blank=False)
    followers = models.ManyToManyField("self",related_name="profile_followers",blank=True)
    create = models.DateTimeField(auto_now=True)
    edit = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user.username + " ---------- " + self.bio

class Form(models.Model):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,null=False,blank=False,verbose_name="Profile")
    body = models.TextField(max_length=160,null=False,blank=False,verbose_name="Form body")
    image = models.FileField(upload_to='profilePhotos',null=True,blank=True,default='default.jpg',verbose_name="Image")
    goruldu = models.ManyToManyField(User,related_name='goruldu',blank=True,verbose_name="Görüldü")
    like = models.ManyToManyField(Profile,related_name='form_like',blank=True,verbose_name="Likes")
    create = models.DateTimeField(auto_now=True,verbose_name="Create")
    edit = models.DateTimeField(auto_now_add=True,verbose_name="Edit")

    def __str__(self):
        return self.profile.user.username + " ---------- " + self.body

class FormAnswer(MPTTModel):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,null=False,blank=False)
    form = models.ForeignKey(Form,on_delete=models.CASCADE,null=False,blank=False)
    body = models.TextField(max_length=160,null=False,blank=False)
    parent = TreeForeignKey('self', on_delete = models.CASCADE, null=True, blank=True, related_name='Children')
    image = models.ImageField(upload_to="profilePhotos",null=True,blank=True,default="default.jpg")
    formanswerlike = models.ManyToManyField(Profile,null=True,blank=True,related_name='form_answer_like')
    create = models.DateTimeField(auto_now=True)
    edit = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.profile.user.username + " ---------- " + self.body