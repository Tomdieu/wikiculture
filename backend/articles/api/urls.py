from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ArticleViewSet, CategoryViewSet, ReadingTimeView

router = DefaultRouter()

router.register("articles", ArticleViewSet, basename="articles")
router.register("categories", CategoryViewSet, basename="categories")

urlpatterns = [
    path("time-tracking/", ReadingTimeView.as_view(), name="time_tracking"),
] 

urlpatterns+=router.urls