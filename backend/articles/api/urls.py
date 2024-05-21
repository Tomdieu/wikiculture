from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ArticleViewSet, CategoryViewSet, ReadingTimeView,CulturalAreaViewSet,RegionViewSet,VillageViewSet

router = DefaultRouter()

router.register("articles", ArticleViewSet, basename="articles")
router.register("categories", CategoryViewSet, basename="categories")
router.register("cultural-areas",CulturalAreaViewSet,basename='cultural-area')
router.register("regions",RegionViewSet,basename='regions')
router.register("villages",VillageViewSet,basename='villages')

urlpatterns = [
    path("time-tracking/", ReadingTimeView.as_view(), name="time_tracking"),
] 

urlpatterns+=router.urls