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

        print("Token : ", token)

        try:
            response = requests.get(USER_INFO, headers=headers)
            response.raise_for_status()
            user_data = response.json()
        except requests.RequestException as e:
            raise AuthenticationFailed(
                "Failed to authenticate. Error: {}".format(str(e))
            )

        # Check if the authenticated data exists in the service, if not create it
        user, _ = User.objects.get_or_create(id=user_data["id"], defaults=user_data)

        # Manually set is_authenticated to True
        user.is_authenticated = True

        return user, None
