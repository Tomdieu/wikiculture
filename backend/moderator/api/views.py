from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    DestroyModelMixin,
)

from rest_framework.permissions import IsAuthenticated

from .serializer import (
    ModerationRecordCreateSerializer,
    ModerationRecordSerializer,
    ArticleSerializer,
)
from .models import ModerationRecord, Article
from .authentication import TokenAuthentication
from .permissions import IsModeratorOrAdmin


# Create your views here.


class ArticleToModerateViewSet(ListModelMixin, GenericViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsModeratorOrAdmin]
    serializer_class = ArticleSerializer
    queryset = Article.objects.filter(approved=False)


class ModerationViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsModeratorOrAdmin]

    queryset = ModerationRecord.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return ModerationRecordCreateSerializer
        return ModerationRecordSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        article = serializer.validated_data["article"]

        user = request.user
        decision = serializer.validated_data["decision"]
        feedback = serializer.validated_data["feedback"]

        data = {
            "user": user,
            "article": article,
            "decision": decision,
            "feedback": feedback,
        }

        ModerationRecord.objects.create(**data)

        return Response(
            {"message": "Moderation record created successfully"}, status=201
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.article.moderation_status == "Pending":
            return super().destroy(request, *args, **kwargs)
        return Response({"error": "Article is not pending moderation"}, status=400)
