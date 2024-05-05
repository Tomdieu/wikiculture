import requests
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

from .models import User


class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization")

        if not token:
            return None

        USER_INFO = f"http://{settings.USER_SERVICE_HOST}:{settings.USER_SERVICE_PORT}/api/users/current_user/"

        headers = {"Authorization": token}

        try:
            response = requests.get(USER_INFO, headers=headers)
            response.raise_for_status()
            user_data = response.json()[0]
        except requests.RequestException as e:
            raise AuthenticationFailed(
                "Failed to authenticate. Error: {}".format(str(e))
            )

        # Get the user base on the user id
        user = User.objects.get(id=user_data["id"])

        return user, None
