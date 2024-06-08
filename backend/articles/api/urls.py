from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ArticleViewSet,
    CategoryViewSet,
    ReadingTimeView,
    CulturalAreaViewSet,
    RegionViewSet,
    VillageViewSet,
    ArticleVisitorsPerDayView,
    UserArticleVisitorsPerDayView
)

router = DefaultRouter()

router.register("articles", ArticleViewSet, basename="articles")
router.register("categories", CategoryViewSet, basename="categories")
router.register("cultural-areas", CulturalAreaViewSet, basename="cultural-area")
router.register("regions", RegionViewSet, basename="regions")
router.register("villages", VillageViewSet, basename="villages")

urlpatterns = [
    path("time-tracking/", ReadingTimeView.as_view(), name="time_tracking"),
    path(
        "articles/<int:article_id>/visitors-per-day/",
        ArticleVisitorsPerDayView.as_view(),
        name="article-visitors-per-day",
    ),
    path('users/<int:user_id>/articles-visitors-per-day/',UserArticleVisitorsPerDayView.as_view(),name="user-article-visitors-per-day")
]

urlpatterns += router.urls
