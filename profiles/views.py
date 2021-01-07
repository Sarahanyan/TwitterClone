from django.shortcuts import render, redirect
from django.http import Http404
from .models import Profile
from .forms import ProfileForm


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=/profile/update")

    user = request.user
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }
    my_profile = user.profile
    form = ProfileForm(request.POST or None,
                       instance=my_profile, initial=user_data)

    if form.is_valid():
        profile_obj = form.save(commit=False)
        user.first_name = form.cleaned_data.get("first_name")
        user.last_name = form.cleaned_data.get("last_name")
        user.email = form.cleaned_data.get("email")
        user.save()
        profile_obj.save()

    context = {
        "form": form,
        "title": "Update Profile",
        "btn_label": "Click to update"}

    return render(request, "profiles/form.html", context)


def tweets_profile_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404

    profile_obj = qs.first()
    context = {
        "profile_username": username,
        "profile": profile_obj}
    return render(request, "profiles/detail.html", context)
