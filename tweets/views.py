from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Tweet


def home_view(request):
    return HttpResponse("<h1>Hello World</h1>")


def tweets_list_view(request):
    tweets_list = {}
    tweets = Tweet.objects.all()
    for tweet in tweets:
        data = {
            "id": tweet.id,
            "content": tweet.content
        }
        tweets_list[tweet.id] = data
        print(tweets_list)

    return JsonResponse(tweets_list)


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    data = {
        "id": tweet_id,
    }
    tweet = Tweet.objects.get(id=tweet_id)
    data["content"] = tweet.content
    content = tweet.content
    return JsonResponse(data)
