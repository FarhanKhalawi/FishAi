from django.contrib import admin
from django.urls import path

from django.urls import path
from . import views

urlpatterns = [
    path('position/<lat>/<lon>/', views.main_api, name='main_api'),
]
