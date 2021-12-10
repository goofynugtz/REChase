from django.contrib import admin
from api.models import Leaderboard, Question
# Register your models here.

class LeaderboardAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "email", "level", "score")

class QuestionsAdmin(admin.ModelAdmin):
  list_display = ("id", "question", "answer")

admin.site.register(Leaderboard, LeaderboardAdmin)
admin.site.register(Question, QuestionsAdmin)