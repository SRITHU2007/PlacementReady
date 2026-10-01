from django.urls import path

from .views import home, register, profile

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

]