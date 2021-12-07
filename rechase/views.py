from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.google.views import OAuth2Client
from rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView):
  adapter_class = GoogleOAuth2Adapter


# class GoogleLogin(SocialLoginView):
#   adapter_class = GoogleOAuth2Adapter
#   client_class = OAuth2Client
#   serializer_class = SocialLoginSerializer

#   def get_serializer(self, *args, **kwargs):
#     serializer_class = self.get_serializer_class()
#     kwargs['context'] = self.get_serializer_context()
#     return serializer_class(*args, **kwargs)