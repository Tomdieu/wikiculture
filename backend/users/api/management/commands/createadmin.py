from typing import Any
from django.core.management.base import BaseCommand,CommandError, CommandParser

from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):

    help = "Create a superuser with user_type : Admin"

    # def add_arguments(self, parser: CommandParser) -> None:
        
    #     parser.add_argument('')

    def handle(self, *args: Any, **options: Any) -> str | None:
        
        username = "wikiculture"
        email = "support@wikiculture.com"
        password = "wikiculture1234"

        user_type = "Admin"

        exists = User.objects.filter(username=username).exists()

        if exists:
            raise CommandError("A user with this username already exists")

        user = User.objects.create(username=username,email=email,user_type=user_type,is_superuser=True,is_staff=True)
        user.set_password(password)
        user.save()

        self.stdout.write(self.style.SUCCESS(f"Successfully created admin with username : `{username}` and password : `{password}`"))