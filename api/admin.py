from django.contrib import admin
from django.contrib.admin.decorators import register
from api.models import Question, Player, TeamLeaderboard, Rules
# Register your models here.

@admin.register(Question)
class QuestionsAdmin(admin.ModelAdmin):
  list_display = ("id", "question", "answer")

@admin.register(TeamLeaderboard)
class TeamLeaderboardAdmin(admin.ModelAdmin):
  list_display = ("id", "teamName", "teamCode", "teamLevel", "teamScore", "teamLeader", "teamPlayerOne", "teamPlayerTwo")

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "email", "picture", "isTeamed")

@admin.register(Rules)
class RuleAdmin(admin.ModelAdmin):
  list_display = ("rule",)

# admin.site.register(Question, QuestionsAdmin)
# admin.site,register(TeamLeaderboard, TeamLeaderboardAdmin)
# admin.site.register(Player, PlayerAdmin)