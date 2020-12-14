from django.db import models
from random import randint
# Create your models here.


class Tweet(models.Model):
    content = models.TextField()
    image = models.FileField(upload_to="images/", null=True, blank=True)

    class Meta:
        ordering = ["-id"]

    def serialize(self):
        return {
            "id": self.pk,
            "content": self.content,
            "likes": randint(0, 1000)
        }
