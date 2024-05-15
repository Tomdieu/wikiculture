from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs
from django.conf import settings
from .models import User
import requests

from channels.auth import UserLazyObject


@database_sync_to_async
def get_user(token_string):
    try:
        USER_INFO = f"http://{settings.USER_SERVICE_HOST}:{settings.USER_SERVICE_PORT}/api/users/current_user/"

        headers = {"Authorization": f"token {token_string}"}
        print("Headers : ", headers)
        try:
            response = requests.get(USER_INFO, headers=headers)
            response.raise_for_status()
            user_data = response.json()
            print("User Data : ", user_data)
        except requests.RequestException as e:
            return AnonymousUser()

        # # Get the user base on the user id
        # user = User.objects.get(user_id=user_data["id"])
        # return user
        # Check if the authenticated data exists in the service, if not create it
        user, _ = User.objects.get_or_create(id=user_data["id"], defaults=user_data)
        return user
    except:
        return AnonymousUser()


class TokenAuthMiddleWare(BaseMiddleware):
    def populate_scope(self, scope):
        if "user" not in scope:
            scope["user"] = UserLazyObject()

    async def resolve_scope(self, scope):
        token = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
        print("Token : ", token)
        scope["user"]._wrapped = await get_user(token)

    async def __call__(self, scope, receive, send):
        scope = dict(scope)

        # Scope injection/mutation per this middleware's needs.
        self.populate_scope(scope)
        # Grab the finalized/resolved scope
        await self.resolve_scope(scope)

        return await super().__call__(scope, receive, send)
