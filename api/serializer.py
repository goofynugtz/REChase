# from django.db import models
# from django.db.models import fields
from rest_framework import serializers
from api.models import Leaderboard

class LeaderboardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Leaderboard
    fields = "__all__"