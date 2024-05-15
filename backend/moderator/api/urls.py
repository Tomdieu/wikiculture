from rest_framework.routers import DefaultRouter

from .views import ModerationViewSet, ArticleToModerateViewSet

router = DefaultRouter()

router.register("moderate-article", ModerationViewSet, basename="moderate-article")
router.register(
    "article-to-moderate", ArticleToModerateViewSet, basename="article-to-moderate"
)

urlpatterns = []

urlpatterns += router.urls
