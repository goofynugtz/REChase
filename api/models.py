from django.db import models
# # Create your models here.

class Leaderboard(models.Model):
  name = models.CharField(max_length=200, null=False, default="")
  email = models.EmailField(max_length=200, null=False, default="")
  level = models.PositiveIntegerField(null=False, default=1)
  score = models.IntegerField(null=False, default=0)
  picture = models.CharField(max_length=200, null=True)

  def __str__(self):
    return self.email

class Question(models.Model):
  id = models.IntegerField(primary_key=True)
  question = models.CharField(max_length=500, null=False)
  answer = models.CharField(max_length=20, null=False)

  def __str__(self):
    return self.question