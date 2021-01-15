from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth import get_user_model
from random import randint

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
User = get_user_model()


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    current_user = request.user
    other_user_qs = User.objects.filter(username=username)

    if current_user.username == username:
        current_followers_qs = current_user.profile.followers.all()
        return Response({"followers_count": current_followers_qs.count()}, status=200)

    if not other_user_qs.exists():
        return Response({}, status=404)

    other_user = other_user_qs.first()
    profile = other_user.profile

    data = request.data or {}
    action = data.get("action")

    if action == "follow":
        profile.followers.add(other_user)
    elif action == "unfollow":
        profile.followers.remove(other_user)

    current_followers_qs = profile.followers.all()

    return Response({"followers_count": current_followers_qs.count()}, status=200)
