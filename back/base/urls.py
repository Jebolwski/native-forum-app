from django.urls import path
from .views import MyTokenObtainPairView
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static





urlpatterns = [
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/<int:pk>/', views.GetProfile, name='profile'),
    path('profile/<int:pk>/forms/', views.ProfileForms, name='profile-forms'),
    path('profile/<int:pk>/edit/', views.EditProfile, name='profile-forms'),
    path('profile/<int:pk>/forms/liked/', views.ProfilesLikedForms, name='profiles-liked-forms'),
    path('profile/<int:pk>/forms/media/', views.ProfilesMediaForms, name='profiles-media-forms'),

    path('create-form/', views.CreateForm, name='create-form'),
    path('forms/', views.Forms, name='forms'),
    path('form/<int:pk>/delete/', views.DeleteForm, name='delete-form'),
    path('form/<int:pk>/like/dislike/', views.LikeDislikeForm, name='like-dislike-form'),
    path('form/<int:pk>/answer/', views.AnswerForm, name='answer-form'),
    path('form/answer/<int:pk>/delete/', views.DeleteFormAnswer, name='delete-form-answer'),
    path('form/<int:pk>/answers/', views.FormAnswers, name='form-answers'),
   
    path('form/answer/<int:pk>/like/dislike/', views.LikeDislikeFormAnswer, name='like-dislike-form'),
    path('form/answer/<int:pk>/answers/', views.FormAnswerAnswers, name='form-answer-answers'),
    path('form/answer/<int:pk>/answer/', views.AnswerFormAnswer, name='answer-form-answer'),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)