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
    path('create-form/', views.CreateForm, name='create-form'),
    path('forms/', views.Forms, name='forms'),
    path('form/<int:pk>/delete/', views.DeleteForm, name='delete-form'),
    path('profile/<int:pk>/', views.GetProfile, name='profile'),
    path('profile/<int:pk>/forms/', views.ProfileForms, name='profile-forms'),
    path('profile/<int:pk>/edit/', views.EditProfile, name='profile-forms'),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)