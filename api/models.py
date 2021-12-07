# from django.db import models

# # Create your models here.
# class Player(models.Model):
#   u_id = models.CharField(primary_key=True, unique=True)
#   profile_image = models.BinaryField()
#   full_name = models.CharField(max_length=100)

#   def __str__(self):
#     return self.full_name


# class Leaderboard(models.Model):
#   player = models.ForeignKey(Player, on_delete=models.CASCADE)
#   level = models.PositiveIntegerField(null=True, default=0)
#   score = models.IntegerField(null=False, default=0)
#   time = models.DateTimeField(auto_now_add=True)

