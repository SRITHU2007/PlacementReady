from django.urls import path
from .views import home, register, profile, student_profile, upload_resume

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [

    path(
        '',
        home,
        name='home'
    ),

    path(
        'register/',
        register,
        name='register'
    ),

    path(
        'login/',
        TokenObtainPairView.as_view(),
        name='login'
    ),

    path(
        'token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

    path(
        'profile/',
        profile,
        name='profile'
    ),
    
    path(
    'student-profile/',
    student_profile,
    name='student_profile'
),
    path(
    'upload-resume/',
    upload_resume,
    name='upload_resume'
),

]