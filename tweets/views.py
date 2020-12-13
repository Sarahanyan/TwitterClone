from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from random import randint

from .models import Tweet


def home_view(request):
    return render(request, "home.html", {})


def tweets_list_view(request):
    tweets_list = []
    tweets = Tweet.objects.all()
    for tweet in tweets:
        single_tweet = {
            "id": tweet.id,
            "content": tweet.content,
            "likes": randint(0, 1000)
        }
        tweets_list.append(single_tweet)
        print(tweets_list)
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    data = {
        "id": tweet_id,
    }
    tweet = Tweet.objects.get(id=tweet_id)
    data["content"] = tweet.content
    content = tweet.content
    return JsonResponse(data)
