from django.db import models
from django.conf import settings
from random import randint
# Create your models here.

user = settings.AUTH_USER_MODEL


class Tweet(models.Model):
    content = models.TextField()
    image = models.FileField(upload_to="images/", null=True, blank=True)
    user = models.ForeignKey(user, on_delete=models.CASCADE)

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
