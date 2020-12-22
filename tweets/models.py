from django.db import models
from django.conf import settings
from random import randint
from django.contrib.auth import get_user_model
# Create your models here.

User = settings.AUTH_USER_MODEL


class TweetLike(models.Model):
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    parent = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)
    image = models.FileField(upload_to="images/", null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(
        User, related_name="user_tweets", blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    # def __str__(self):
    #     return self.content

    @property
    def is_retweet(self):
        return self.parent != None

    def serialize(self):
        return {
            "id": self.pk,
            "content": self.content,
            "likes": randint(0, 1000)
        }
