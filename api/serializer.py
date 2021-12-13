# from django.db import models
# from django.db.models import fields
from django.db import models
from django.db.models import fields
from rest_framework import serializers
from api.models import TeamLeaderboard, Player

# class LeaderboardSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Leaderboard
#     fields = "__all__"

class PlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Player
    fields = "__all__"


class TeamLeaderboardSerializer(serializers.ModelSerializer):
  teamLeader = PlayerSerializer(many=False, read_only=True)
  teamPlayerOne = PlayerSerializer(read_only=True)
  teamPlayerTwo = PlayerSerializer(read_only=True)

  class Meta:
    model = TeamLeaderboard
    fields = ["id", "teamName", "teamCode", "teamLevel", "teamScore", "teamLeader", "teamPlayerOne", "teamPlayerTwo"]