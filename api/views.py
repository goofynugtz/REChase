from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.serializers import Serializer
from api.models import Question, TeamLeaderboard, Player, Rules
from rest_framework.response import Response
from rest_framework import status, viewsets
from api.serializer import TeamLeaderboardSerializer, PlayerSerializer

import random 
import string

class GoogleLogin(SocialLoginView):
  adapter_class = GoogleOAuth2Adapter


class TeamLeaderboardView(viewsets.ModelViewSet):
  queryset = TeamLeaderboard.objects.order_by("-teamScore", "teamLevel")
  serializer_class = TeamLeaderboardSerializer


class PlayerView(viewsets.ModelViewSet):
  queryset = Player.objects.all()
  serializer_class = PlayerSerializer


def generateTeamCode(k):
  return "".join(random.choices(string.ascii_uppercase + string.digits, k=k))


@api_view(['POST'])
def createTeam(request):
  # request.data = {
  #   "teamName": "rhau",
  #   "email": "a@amail.com",
  # }
  player = Player.objects.get(email=request.data["email"])
  if TeamLeaderboard.objects.filter(teamLeader=player).count() > 0:
    return Response({"message": "Already in a team."}, status=status.HTTP_208_ALREADY_REPORTED)

  teamCode = None
  unique = False
  while (not unique):
    teamCode  = generateTeamCode(6)
    if (TeamLeaderboard.objects.filter(teamCode=teamCode).count() == 0):
      unique = True

  
  print("\n\n", teamCode, "\n\n")
  teamLeader = Player.objects.get(email=request.data["email"])
  teamLeader.isTeamed = True
  teamLeader.save()
  # print("\n\n", teamLeader, "\n\n")
  if (not teamLeader):
    return Response(status=status.HTTP_401_UNAUTHORIZED)

  team = TeamLeaderboard.objects.create(
    teamCode = teamCode,
    teamName = request.data["teamName"],
    teamLeader = teamLeader
  )
  team.save()
  
  # print("\n\n>> Code is here \n\n")
  return Response({"teamCode": teamCode, "teamName": request.data["teamName"]}, status=status.HTTP_201_CREATED)
  # return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def joinTeam(request):
  # {
  #   "teamCode": "H8AM0H",
  #   "name": "David",
  #   "email": "rahulranjan25.rr@gmail.com",
  #   "picture": "dfggdf"
  # }

  team = None

  # If team exists:
  if TeamLeaderboard.objects.filter(teamCode=request.data["teamCode"]).count() == 1:
    team = TeamLeaderboard.objects.get(teamCode=request.data["teamCode"])
    
    if team.teamPlayerOne:
      if team.teamPlayerTwo:
        return Response({"message": "Team is Full"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
      playerTwo = Player.objects.get(email=request.data["email"])
      if (team.teamPlayerOne == playerTwo):
        return Response({"message": "Already in the same team"}, status=status.HTTP_208_ALREADY_REPORTED)
      team.teamPlayerTwo = playerTwo
      playerTwo.isTeamed = True
      playerTwo.save()
      team.save()
      return Response({"message": "Added Third Player"}, status=status.HTTP_202_ACCEPTED)
    
    playerOne = Player.objects.get(email=request.data["email"])
    team.teamPlayerOne = playerOne
    playerOne.isTeamed = True
    playerOne.save()
    team.save()
    return Response({"message": "Added Second Player"}, status=status.HTTP_202_ACCEPTED)
  return Response({"message": "Invalid Code"}, status=status.HTTP_404_NOT_FOUND)





@api_view(['POST'])
def updateDashboardOnLogin(request):
  playerData = PlayerSerializer(data=request.data)
  
  if playerData.is_valid():
    player = None
    
    # If Player is in Players db
    if Player.objects.filter(email=request.data["email"]).count() == 1:
      player = Player.objects.get(email=request.data["email"])
      team = None

      # isTeamed = False

      if player.isTeamed:
      # If player is the leader of any team
        if TeamLeaderboard.objects.filter(teamLeader=player).count() == 1:
          team = TeamLeaderboard.objects.get(teamLeader=player)
          response = {
            "name": player.name,
            "isLeader": 1,
            "isTeamed": player.isTeamed,
            "teamName": team.teamName,
            "teamCode": team.teamCode,
            "level": team.teamLevel,
            "score": team.teamScore,
          }
          return Response({"profile": response}, status = status.HTTP_202_ACCEPTED)

        # If player is in any team
        elif TeamLeaderboard.objects.filter(teamPlayerOne=player).count() == 1:
          team = TeamLeaderboard.objects.get(teamPlayerOne=player)

        elif TeamLeaderboard.objects.filter(teamPlayerTwo=player).count() == 1:
          team = TeamLeaderboard.objects.get(teamPlayerTwo=player)
        
        response = {
          "name": player.name,
          "isLeader": 0,
          "isTeamed": player.isTeamed,
          "teamName": team.teamName,
          "teamCode": team.teamCode,
          "level": team.teamLevel,
          "score": team.teamScore,
        }
        return Response({"profile": response}, status = status.HTTP_202_ACCEPTED)
      
      # If the player is in db but not in any team
      if not player.isTeamed:
        response = {
          "name": player.name,
          "isLeader": 0,
          "isTeamed": player.isTeamed,
          "level": 1,
          "score": 0,
        }
        return Response({"profile": response }, status=status.HTTP_200_OK)
        

    # New Entry
    player = Player.objects.create(
      name = request.data["name"],
      email = request.data["email"],
      picture = request.data["picture"],
      isTeamed = False,
    )

    player.save()

    response = {
      "name": player.name,
      "isLeader": 0,
      "isTeamed": 0,
      "level": 1,
      "score": 0,
    }

    return Response({"profile": response}, status = status.HTTP_201_CREATED)
  return Response(playerData.data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getQuestion(request):
  level = Question.objects.get(id=request.data["id"])
  return Response({"question": level.question}, status=status.HTTP_200_OK)


@api_view(['POST'])
def verifyAnswer(request):
  # request.data = {
  #   "teamCode": "S3RS6A",
  #   "id": 1,
  #   "answer": "red"
  # }

  db = Question.objects.get(id=request.data["id"])
  answer = db.answer

  if answer.lower() == request.data["answer"].lower():
    team = TeamLeaderboard.objects.get(teamCode=request.data["teamCode"])
    if team.level <= 3 and team.score < Question.objects.all().count() * 10:
      team.score += 10
    if team.level < 3:
      team.level += 1
    team.save()
    return Response({"isCorrect": True}, status=status.HTTP_202_ACCEPTED)

  return Response({"isCorrect": False}, status=status.HTTP_200_OK)
    

# @permission_classes([AllowAny])
# class leaderboard(generics.GenericAPIView):
#   def get(self, request, format=None):
#     p = Leaderboard.objects.order_by("-score", "level")
#     current_rank = 1
#     players = []
#     for player in p:
#       players.append({
#           "name": player.name,
#           "rank": current_rank,
#           "level": player.level,
#           "score": player.score,
#           "image": player.picture,
#       })
#       current_rank += 1
#     return Response({"standings": players, "safe": False, "status": status.HTTP_200_OK})

@api_view(['GET'])
def TeamLeaderboardView(request):
  db = TeamLeaderboard.objects.order_by("-teamScore", "teamLevel")
  rank = 1
  teams = []
  for team in db:
    if (team.teamPlayerOne):
      if (team.teamPlayerTwo):
        teams.append({
          "teamName": team.teamName,
          "teamScore": team.teamScore,
          "teamRank": rank,
          "teamLevel": team.teamLevel,
          "teamLeader": [
            team.teamLeader.name,
            team.teamLeader.picture
          ],
          "teamPlayerOne": [
          team.teamPlayerOne.name,
          team.teamPlayerOne.picture,
        ],
          "teamPlayerTwo": [
          team.teamPlayerTwo.name,
          team.teamPlayerTwo.picture,
        ],
        })
      
      else:
        teams.append({
          "teamName": team.teamName,
          "teamScore": team.teamScore,
          "teamRank": rank,
          "teamLevel": team.teamLevel,
          "teamLeader": [
            team.teamLeader.name,
            team.teamLeader.picture
          ],
          "teamPlayerOne": [
          team.teamPlayerOne.name,
          team.teamPlayerOne.picture,
        ],
        })
    else :
      teams.append({
        "teamName": team.teamName,
        "teamScore": team.teamScore,
        "teamRank": rank,
        "teamLevel": team.teamLevel,
        "teamLeader": [
          team.teamLeader.name,
          team.teamLeader.picture
        ],
      })
    
    # print("\n\n", team, "\n\n")
    rank += 1
  return Response({"standings": teams}, status=status.HTTP_200_OK)


@api_view(["POST"])
def deleteTeam(request):

  # {
  #   "teamCode": "F4HR6D",
  #   "email": "rahulranjan25.rr@gmail.com"
  # }

  if TeamLeaderboard.objects.filter(teamCode=request.data["teamCode"]).count() == 1:
    team = TeamLeaderboard.objects.get(teamCode=request.data["teamCode"])
    playerOneEmail = team.teamPlayerOne.email
    playerTwoEmail = team.teamPlayerTwo.email

    teamLeader = Player.objects.get(email=request.data["email"])
    teamLeader.isTeamed = False
    teamLeader.save()

    teamPlayerOne = Player.objects.get(email=playerOneEmail)
    teamPlayerOne.isTeamed = False
    teamPlayerOne.save()

    teamPlayerTwo = Player.objects.get(email=playerTwoEmail)
    teamPlayerTwo.isTeamed = False
    teamPlayerTwo.save()

    team.delete()

    return Response({"message": "Team has been deleted."}, status=status.HTTP_200_OK)

  return Response({"message": "Team not Found to be deleted."}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def rules(request):
  rules = []
  db = Rules.objects.all()
  for rule in db:
    rules.append({
      "rule": rule.rule
    })

  return Response(rules, status=status.HTTP_200_OK)
