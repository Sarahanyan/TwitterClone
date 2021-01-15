from django.db import models
from django.conf import settings
from random import randint
from django.contrib.auth import get_user_model
from django.db.models import Q
User = settings.AUTH_USER_MODEL


class TweetLike(models.Model):
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class TweetQuerySet(models.QuerySet):
    def feed(self, user):
        profiles_exist = user.following.exists()
        followed_users_id = []
        if profiles_exist:
            followed_users_id = user.following.values_list(
                "user__id", flat=True)
        return self.filter(
            Q(user__id__in=followed_users_id) |
            Q(user=user)
        ).distinct().order_by("-timestamp")


class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)


class Tweet(models.Model):
    parent = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)
    image = models.FileField(upload_to="images/", null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tweets")
    likes = models.ManyToManyField(
        User, related_name="user_likes", blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()

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
