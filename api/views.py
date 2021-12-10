from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from api.models import Leaderboard, Question
from rest_framework.response import Response
from rest_framework import status
from api.serializer import LeaderboardSerializer

class GoogleLogin(SocialLoginView):
  adapter_class = GoogleOAuth2Adapter

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def updateLeaderboardOnLogin(request):
  if request.method == "POST":
    leaderboard_data = LeaderboardSerializer(data=request.data)
    
    if leaderboard_data.is_valid():
      db = Leaderboard.objects.filter(email=request.data["email"])
      response = []
      for details in db:
        response.append({
          "name": details.name,
          "level": details.level,
          "score": details.score,
        })

      if Leaderboard.objects.filter(email=request.data["email"]):
        return Response({"profile": response}, status = status.HTTP_202_ACCEPTED)

      else :
        # New Entry
        leaderboard_data.save()
        return Response(leaderboard_data.data, status = status.HTTP_201_CREATED)

    return Response(leaderboard_data.data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getQuestion(request):
  if request.method == "POST":
    db = Question.objects.filter(id=request.data["id"])
    question = []
    for level in db:
      question.append(level.question)
    
    return Response({"question": question}, status=status.HTTP_200_OK)


@api_view(['POST'])
def verifyAnswer(request):

  if request.method == "POST":
    db = Question.objects.filter(id=request.data["id"])
    answer = []

    for entry in db:
      answer.append(entry.answer)

    if answer[0].lower() == request.data["answer"].lower():
      profile = Leaderboard.objects.get(email=request.data["email"])
      if profile.level <= 3 and profile.score < Question.objects.all().count() * 10:
        profile.score += 10
      if profile.level < 3:
        profile.level += 1
      profile.save()
      return Response({"isCorrect": True}, status=status.HTTP_202_ACCEPTED)
    
    return Response({"isCorrect": False}, status=status.HTTP_200_OK)
    

@permission_classes([AllowAny])
class leaderboard(generics.GenericAPIView):
  def get(self, request, format=None):
    p = Leaderboard.objects.order_by("-score", "level")
    current_rank = 1
    players = []
    for player in p:
      players.append({
          "name": player.name,
          "rank": current_rank,
          "level": player.level,
          "score": player.score,
          "image": player.picture,
      })
      current_rank += 1
    return Response({"standings": players, "safe": False, "status": status.HTTP_200_OK})