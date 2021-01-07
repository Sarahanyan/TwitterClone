from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from .models import Tweet

# Create your tests here.
User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="bella", password="rose")
        self.user2 = User.objects.create_user(
            username="violet", password="vio")
        Tweet.objects.create(content="my first tweet", user=self.user)
        Tweet.objects.create(content="my second tweet", user=self.user)
        Tweet.objects.create(content="my third tweet", user=self.user2)
        Tweet.objects.create(content="my fourth tweet", user=self.user2)

        self.currentCount = Tweet.objects.all().count()

    def test_user_created(self):
        # userBelle = User.objects.get(username="bella")
        self.assertEqual(self.user.username, "bella")
        # self.assertEqual(self.user2.username, "ve")

    def test_tweet_created(self):
        tweet = Tweet.objects.create(content="my fifth tweet", user=self.user)
        self.assertEqual(tweet.user, self.user)
        self.assertEqual(tweet.id, 5)

    def test_tweet_related_name(self):
        user = self.user
        self.assertEqual(user.tweets.count(), 2)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="rose")
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/",
                               {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)

        my_like_instances_count = self.user.tweetlike_set.count()
        self.assertEqual(my_like_instances_count, 1)
        my_related_likes = self.user.user_likes.count()
        self.assertEqual(my_like_instances_count, my_related_likes)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/",
                               {"id": 2, "action": "like"})
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/tweets/action/",
                               {"id": 2, "action": "unlike"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)

    def test_action_retweet(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/",
                               {"id": 2, "action": "retweet"})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertNotEqual(new_tweet_id, 2)
        self.assertEqual(self.currentCount + 1, new_tweet_id)

    def test_tweet_create_api_view(self):
        client = self.get_client()
        response = client.post("/api/tweets/create/",
                               {"content": "Hey I am a new tweet"})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertEqual(self.currentCount + 1, new_tweet_id)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1/")
        data = response.json()
        tweet_id = data.get("id")
        self.assertEqual(tweet_id, 1)
        self.assertEqual(response.status_code, 200)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 200)

        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 404)

        client = self.get_client()
        response_incorrect_owner = client.delete("/api/tweets/4/delete/")
        print(response_incorrect_owner)
        self.assertEqual(response_incorrect_owner.status_code, 403)
