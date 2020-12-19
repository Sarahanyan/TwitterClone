from rest_framework import serializers
from django.conf import settings

from .models import Tweet

TWEET_MAX_LENGTH = settings.TWEET_MAX_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        if value.lower().strip() not in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action")
        return value


class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ["content", "likes"]

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > TWEET_MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value