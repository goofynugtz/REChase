from django.db import models
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import User
# # Create your models here.

# # class Leaderboard(models.Model):
# #   player = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
# #   level = models.PositiveIntegerField(null=True, default=0)
# #   score = models.IntegerField(null=False, default=0)
# #   # time = models.DateTimeField(auto_now_add=True)

class Leaderboard(models.Model):
  name = models.CharField(max_length=200, null=False, default="")
  email = models.EmailField(max_length=200, null=False, default="")
  level = models.PositiveIntegerField(null=False, default=0)
  score = models.IntegerField(null=False, default=0)
  picture = models.CharField(max_length=200, null=True)

  def __str__(self):
    return self.name


class Questions(models.Model):
  question = models.CharField(max_length=500, null=False)
  answer = models.CharField(max_length=20, null=False)

  def __str__(self):
    return self.question