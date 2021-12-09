# from django.db import models
# from django.db.models import fields
from rest_framework import serializers
from api.models import Leaderboard
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import User

class LeaderboardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Leaderboard
    fields = "__all__"

class SocialAccountSerializer(serializers.ModelSerializer):
  Leaderboard = LeaderboardSerializer(read_only=False, many=True)
  class Meta:
    model = SocialAccount
    fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
  Leaderboard = LeaderboardSerializer(read_only=False)
  class Meta:
    model = User
    fields = "__all__"