from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response
from .models import (
    Article,
    Category,
    ReadingTime,
    CulturalArea,
    Region,
    Village,
    ArticleVistors,
    ArticleRevision,
    ArticleLike,
)
from .serializers import (
    CulturalListSerializer,
    ReadingTimeCreateSerializer,
    ArticleListWithRecommendationSerializer,
    ArticleSerializer,
    CategorySerializer,
    ArticleListSerializer,
    ReadingTimeSerializer,
    ArticleHistorySerializer,
    ArticleHistoryDeleteSerializer,
    CulturalAreaSerializer,
    RegionSerializer,
    VillageSerializer,
)
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .authentication import TokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from api.lib.recommend_articles import recommend_articles
from django.db.models import Q, Count, Sum
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from django_filters.rest_framework import DjangoFilterBackend
from .filters import ArticleFilter


# Create your views here.


class ArticleViewSet(
    GenericViewSet,
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = PageNumberPagination
    authentication_classes = [TokenAuthentication]

    filter_backends = [DjangoFilterBackend]
    filterset_class = ArticleFilter

    def get_permissions(self):
        if self.action in [
            "list",
            "retrieve",
            "latest",
            "with_recommendations",
            "newest",
            "popular",
            "most_read",
            "like",
            "likes",
        ]:  # AllowAny for 'list' action
            return [AllowAny()]
        return [IsAuthenticated()]  # For other actions, use IsAuthenticated permission

    def get_serializer_class(self):
        if self.action in ["like","total"]:
            return None
        if self.action in [
            "list",
            "retrieve",
            "mine",
            "latest",
            "newest",
            "popular",
            "most_read",
        ]:
            return ArticleListSerializer
        elif self.action in ["with_recommendations"]:
            return ArticleListWithRecommendationSerializer
        return ArticleSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        # Capture the visitor's IP address and user-agent
        instance: Article = self.get_object()
        user = request.user

        ip_address = request.META.get("REMOTE_ADDR")
        user_agent = request.META.get("HTTP_USER_AGENT", "")
        try:
            if user:
                if instance.author.id != user.id:
                    ArticleVistors.objects.create(
                        article=instance, ip_address=ip_address, user_agent=user_agent
                    )
                else:
                    pass
            else:
                ArticleVistors.objects.create(
                    article=instance, ip_address=ip_address, user_agent=user_agent
                )
        except Exception as e:
            pass
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            ArticleListSerializer(instance).data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    @swagger_auto_schema(
        operation_description="Like an article",
        request_body=None,
        responses={
            201: openapi.Response(
                description="Article liked",
                examples={"application/json": {"message": "Article liked"}},
            )
        },
    )
    @action(methods=["post"], detail=True)
    def like(self, request, *args, **kwargs):
        user = request.user if (request.user and request.user.id) is not None else None
        instance = self.get_object()
        user_agent = request.META.get("HTTP_USER_AGENT", "")
        ArticleLike.objects.create(
            article=instance,
            user=user,
            ip_address=request.user_ip,
            user_agent=user_agent,
        )

        return Response({"message": "Article liked"}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Get the number of likes of an article",
        request_body=None,
        responses={
            200: openapi.Response(
                description="Number of likes",
                examples={"application/json": {"likes": 123}},
            )
        },
    )
    @action(methods=["get"], detail=True)
    def likes(self, request, *args, **kwargs):
        instance = self.get_object()
        articles_likes = ArticleLike.objects.filter(article=instance)

        return Response({"likes": len(articles_likes)})

    @swagger_auto_schema(
        operation_description="Total number of articles",
        request_body=None,
        responses={
            200: openapi.Response(
                description="Total number of aricles",
                examples={"application/json": {"total": 100}},
            )
        },
    )
    @action(detail=False)
    def total(self, request, *args, **kwargs):
        user = request.user
        articles = Article.objects.filter(author_id=user.id)
        return Response({"total": len(articles)})

    @action(methods=["get"], detail=False)
    def latest(self, request, *args, **kwargs):
        queryset = Article.objects.all()[:10]
        serializer = ArticleListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="newest")
    def newest(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().order_by("-created_at"))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="popular")
    def popular(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            self.get_queryset()
            .annotate(likes_count=Count("likes"))
            .order_by("-likes_count")
            .filter(likes_count__gt=0)
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="most_read")
    def most_read(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            self.get_queryset()
            .annotate(total_time_spent=Sum("readingtime__total_time_spent"))
            .order_by("-total_time_spent")
            .filter(total_time_spent__gt=0)
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def with_recommendations(self, request, *args, **kwargs):
        instance = self.get_object()
        article_id = instance.id
        print("User Ip : ", request.user_ip)
        serializer = ArticleListSerializer(
            instance, context={"request": request.user_ip}
        )

        try:
            ArticleVistors.objects.create(article=instance, ip_address=request)
        except:
            pass
        # Get related articles base on the village

        related_articles = Article.objects.filter(village=instance.village).exclude(
            pk=instance.id
        )[
            :5
        ]  # Exclude the current article
        related_articles_serializer = ArticleListSerializer(related_articles, many=True)
        recommendations = recommend_articles(article_id)
        recommendation_serializer = ArticleListSerializer(recommendations, many=True)
        print("Recommended : ", recommendations)
        print("Related : ", related_articles)
        return Response(
            {
                "data": serializer.data,
                "recommendations": recommendation_serializer.data,
                "related_articles": related_articles_serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    @action(methods=["get"], detail=False)
    def mine(self, request, *args, **kwargs):

        user = request.user
        queryset = Article.objects.filter(author_id=user.id)
        # Paginate the queryset
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def versions(self, request, *args, **kwargs):
        instance = self.get_object()

        history = Article.history.model.objects.filter(id=instance.id)

        serializer = ArticleHistorySerializer(history, many=True)

        return Response(serializer.data)

    @action(
        detail=True,
        methods=["post"],
        url_path="delete-version",
        serializer_class=ArticleHistoryDeleteSerializer,
    )
    def delete_version(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()

        if instance.author == user or (
            user.user_type == "Moderator" or user.user_type == "Admin"
        ):

            HistoryModel = Article.history.model

            serializer = ArticleHistoryDeleteSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            ids = serializer.validate.get("ids", [])
            histories = HistoryModel.objects.filter(id__in=ids)
            histories.delete()

            return Response(
                {"message": "History Deleted Successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        return Response(
            {"message": "Permission deny"}, status=status.HTTP_401_UNAUTHORIZED
        )


# class


class CategoryViewSet(
    GenericViewSet,
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(methods=["get"], detail=False)
    def all(self, requests, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CulturalAreaViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = CulturalArea.objects.all()
    serializer_class = CulturalAreaSerializer
    permission_classes = [AllowAny]

    @action(detail=False)
    def all(self, requests, *args, **kwargs):
        queryset = CulturalArea.objects.all()
        serializer = CulturalListSerializer(queryset, many=True)
        return Response(serializer.data)


class RegionViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [AllowAny]


class VillageViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = Village.objects.all()
    serializer_class = VillageSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="List of articles with optional query params",
        manual_parameters=[
            openapi.Parameter(
                "query",
                openapi.IN_QUERY,
                description="Search either village name,description ,region or cultural area",
                type=openapi.TYPE_STRING,
                required=True,
            ),
        ],
    )
    @action(methods=["get"], detail=False)
    def search(self, requests, *args, **kwargs):

        # Apply pagination class here
        self.pagination_class = PageNumberPagination

        query = requests.query_params.get("query", None)

        queryset = Village.objects.filter(
            Q(name__icontains=query)
            | Q(description__icontains=query)
            | Q(region__name__icontains=query)
            | Q(region__cultural_area__name__icontains=query)
        )

        # Paginate the queryset
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@method_decorator(csrf_exempt, name="dispatch")
class ReadingTimeView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    @swagger_auto_schema(
        request_body=ReadingTimeCreateSerializer,
        responses={201: ReadingTimeSerializer, 400: "Bad Request"},
    )
    def post(self, request, format=None):
        user = (
            request.user if request.user.is_authenticated else None
        )  # Handle both authenticated and unauthenticated users

        ip_address = request.META.get("REMOTE_ADDR")
        user_agent = request.META.get("HTTP_USER_AGENT")

        print("User agent : ", user_agent, " ip address : ", ip_address)

        # Validate input data using the serializer
        serializer = ReadingTimeCreateSerializer(data=request.data)
        if serializer.is_valid():
            article = serializer.validated_data.get("article_id")
            time_spent = serializer.validated_data.get("time_spent")

            # Retrieve or create ReadingTime object
            reading_time, created = ReadingTime.objects.get_or_create(
                user=user, article=article, ip_address=ip_address, user_agent=user_agent
            )

            # Update total time spent
            reading_time.total_time_spent += int(time_spent)
            reading_time.save()

            # Serialize the updated reading_time instance
            response_serializer = ReadingTimeSerializer(reading_time)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return errors if the input data is invalid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
