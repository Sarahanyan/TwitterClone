from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="bella", password="rose")
        self.user2 = User.objects.create_user(
            username="violet", password="vio")

    def test_profile_created(self):
        no_of_profiles = Profile.objects.all().count()
        self.assertEqual(no_of_profiles, 2)

    def test_following(self):
        first_user = self.user
        second_user = self.user2
        first_user.profile.followers.add(second_user)
        # who the second user follows
        second_user_following_whom = second_user.following.all()
        second_user_following_first = second_user_following_whom.filter(
            user=first_user)  # check if second user follows the first user
        self.assertTrue(second_user_following_first.exists())

        first_user_following_nobody = first_user.following.all()
        self.assertFalse(first_user_following_nobody)
