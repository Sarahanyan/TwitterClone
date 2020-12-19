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
    content = models.TextField()
    image = models.FileField(upload_to="images/", null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(
        User, related_name="user_tweets", blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.content

    def serialize(self):
        return {
            "id": self.pk,
            "content": self.content,
            "likes": randint(0, 1000)
        }
