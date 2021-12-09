from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from django.db.models.query import QuerySet
import jsonfield
from rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, serializers
from api.models import Leaderboard
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from jsonfield import JSONField

from api.serializer import LeaderboardSerializer, UserSerializer, SocialAccountSerializer

class GoogleLogin(SocialLoginView):
  adapter_class = GoogleOAuth2Adapter

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def updateLeaderboardOnLogin(request):
  print(request)
  if request.method == "POST":
    # userSerialize = UserSerializer(data=request.data["user"])
    # socialSerialize = SocialAccountSerializer(data=request.data["profile"])
    leadSerialize = LeaderboardSerializer(data=request.data)

    if leadSerialize.is_valid():
      if Leaderboard.objects.filter(email=request.data["email"]):
        return Response(leadSerialize.data, status = status.HTTP_202_ACCEPTED)

      else :
        leadSerialize.save()
        return Response(leadSerialize.data, status = status.HTTP_201_CREATED)

    return Response(leadSerialize.data, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])


@permission_classes([AllowAny])
class leaderboard(generics.GenericAPIView):
  def get(self, request, format=None):
    p = Leaderboard.objects.order_by("-score")
    current_rank = 1
    players_array = []
    status = 200
    for player in p:
      player.rank = current_rank
      players_array.append({
          "name": player.name,
          "rank": current_rank,
          "score": player.score,
          "image": player.picture,
      })
      current_rank += 1
    return Response({"standings": players_array, "safe": False, "status": status})

# class LeaderboardAPI(viewsets.ModelViewSet):
#   queryset = Player.objects.all()
#   serializer_class = PlayerSerializer