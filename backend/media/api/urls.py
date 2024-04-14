from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('upload', views.FileUploadViewSet)

urlpatterns = router.urls
