from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

router = DefaultRouter()

router.register("upload", views.FileUploadViewSet, basename="upload")
router.register("media", views.MediaViewSet, basename="media")

urlpatterns = [
    path("replace-file/", views.FileReplaceView.as_view()),
    path("delete-file/", views.DeleteFileView.as_view()),
]

urlpatterns += router.urls
