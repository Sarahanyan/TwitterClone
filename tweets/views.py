from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from random import randint

from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request):
    return render(request, "home.html", {})


def tweets_list_view(request):
    tweets = Tweet.objects.all()
    tweets_list = [tweet.serialize() for tweet in tweets]
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
    return JsonResponse(data)


def create_tweet_view(request):
    form = TweetForm(request.POST or None)
    next_url = request.POST["next"] or None
    if form.is_valid():
        print("cleaned data", form.cleaned_data)
        obj = form.save(commit=False)
        obj.save()

        if request.is_ajax():
            # 201 - item created successfully
            return JsonResponse(obj.serialize(), status=201)

        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    context = {"form": form}
    return render(request, "create_tweet.html", context)
