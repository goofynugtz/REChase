from django.contrib import admin
from api.models import Leaderboard
# Register your models here.

class LeaderboardAdmin(admin.ModelAdmin):
  list_display = ("name", "email", "level", "score")

admin.site.register(Leaderboard, LeaderboardAdmin)