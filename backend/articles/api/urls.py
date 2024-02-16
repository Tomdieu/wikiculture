from rest_framework.routers import DefaultRouter

from .views import ArticleViewSet, CategoryViewSet

router = DefaultRouter()

router.register('articles', ArticleViewSet, basename='articles')
router.register('categories', CategoryViewSet, basename='categories')

urlpatterns = router.urls