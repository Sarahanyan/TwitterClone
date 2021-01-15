from django.urls import path, include
from .views import tweets_profile_view, profile_update_view

urlpatterns = [
    path("edit", profile_update_view),
    path("<str:username>", tweets_profile_view),
]
