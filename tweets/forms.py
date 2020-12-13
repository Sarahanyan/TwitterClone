from django import forms
from .models import Tweet

MAX_LENGTH = 240


class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")

        if len(content) > 240:
            raise forms.ValidationError("Tweet is too long")
        return content
