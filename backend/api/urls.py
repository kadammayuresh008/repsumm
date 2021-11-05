from django.urls import path
from . import views

urlpatterns = [
    path('rps/', views.RPView.as_view(), name= 'rps_list'),
] 