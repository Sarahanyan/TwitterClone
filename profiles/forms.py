from django import forms
from .models import Profile


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()

    class Meta:
        model = Profile
        fields = ['location', 'bio']
