from django.conf import settings
from django import forms
from .models import Tweet

TWEET_MAX_LENGTH = settings.TWEET_MAX_LENGTH


class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")

        if len(content) > 240:
            raise forms.ValidationError("Tweet is too long")
        return content
