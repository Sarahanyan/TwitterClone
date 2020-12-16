from rest_framework import serializers
from django.conf import settings

from .models import Tweet

TWEET_MAX_LENGTH = settings.TWEET_MAX_LENGTH


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ["content"]

    def validate_content(self, value):
        if len(value) > TWEET_MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value
