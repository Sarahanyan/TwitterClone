from django.contrib import admin
from django.urls import path
from tweets.views import (
    home_view,
    tweets_detail_view,
    tweets_list_view,
    create_tweet_view,
    delete_tweet_view,
    tweet_action_view
)

urlpatterns = [
    path("", tweets_list_view),
    path("action/", tweet_action_view),
    path("create/", create_tweet_view),
    path("<int:tweet_id>/", tweets_detail_view),
    path("<int:tweet_id>/delete/", delete_tweet_view),
]
