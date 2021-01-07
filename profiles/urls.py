from django.urls import path, include
from .views import tweets_profile_view

urlpatterns = [
    path("<str:username>", tweets_profile_view),
]
