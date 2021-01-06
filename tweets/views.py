from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from random import randint

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from .models import Tweet
from .forms import TweetForm
from .serializers import TweetCreateSerializer, TweetSerializer, TweetActionSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    context = {"profile_username": username}
    return render(request, "home.html", context)


def tweets_list_view(request):
    return render(request, "tweets/list.html")


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    context = {"tweet_id": tweet_id}
    return render(request, "tweets/detail.html", context)


def tweets_profile_view(request, username, *args, **kwargs):
    context = {"profile_username": username}
    return render(request, "tweets/profile.html", context)
