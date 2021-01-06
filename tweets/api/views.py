from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from random import randint

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from ..models import Tweet
from ..forms import TweetForm
from ..serializers import TweetCreateSerializer, TweetSerializer, TweetActionSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['GET'])
def tweets_list_view(request):
    qs = Tweet.objects.all()
    username = request.GET.get('username')
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def tweets_detail_view(request, tweet_id):
    qs = Tweet.objects.filter(id=tweet_id)
    if qs.exists():
        obj = qs.first()
    if not qs.exists():
        return Response({"message": "This tweet does not exist"}, status=404)
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(['POST'])
# @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def create_tweet_view(request, *args, **kwargs):
    print(request.POST)
    print(request.data)
    serializer = TweetCreateSerializer(data=request.POST or request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def delete_tweet_view(request, tweet_id):
    qs = Tweet.objects.filter(id=tweet_id)

    if not qs.exists():
        return Response({"message": "This tweet does not exist"}, status=404)

    qs = qs.filter(user=request.user)

    if not qs.exists():
        return Response({"message": "Not authorized to delete this tweet"}, status=403)

    if qs.exists():
        obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet deleted"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request):
    print(request.POST)
    print(request.data)
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer = serializer.validated_data
        tweet_id = serializer.get("id")
        action = serializer.get("action")
        content = serializer.get("content")

    qs = Tweet.objects.filter(id=tweet_id)

    if not qs.exists():
        return Response({"message": "This tweet does not exist"}, status=404)

    obj = qs.first()

    if action == "like":
        obj.likes.add(request.user)
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=200)
    elif action == "unlike":
        obj.likes.remove(request.user)
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=200)
    elif action == "retweet":
        parent_tweet = obj
        retweeted_tweet = Tweet.objects.create(
            parent=parent_tweet, user=request.user, content=content)
        serializer = TweetSerializer(retweeted_tweet)
        return Response(serializer.data, status=201)


def tweets_list_view_pure_django(request):
    tweets = Tweet.objects.all()
    tweets_list = [tweet.serialize() for tweet in tweets]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)


def tweets_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    data = {
        "id": tweet_id,
    }
    tweet = Tweet.objects.get(id=tweet_id)
    data["content"] = tweet.content
    return JsonResponse(data)


def create_tweet_view_pure_django(request):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax:
            return JsonResponse({}, status=401)
        return redirect("/login")
    form = TweetForm(request.POST or None)
    next_url = request.POST["next"] or None
    if form.is_valid():
        print("cleaned data", form.cleaned_data)
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()

        if request.is_ajax():
            # 201 - item created successfully
            return JsonResponse(obj.serialize(), status=201)

        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()

    if form.errors:
        if request.is_ajax:
            return JsonResponse(form.errors, status=400)
    context = {"form": form}
    return render(request, "create_tweet.html", context)
