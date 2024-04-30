from rest_framework.routers import DefaultRouter

from .views import ModerationViewSet

router = DefaultRouter()

router.register('moderate-article',ModerationViewSet,basename='moderate-article')

urlpatterns = [
    
]

urlpatterns += router.urls
