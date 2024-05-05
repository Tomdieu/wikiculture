from django.contrib import admin

# Register your models here.

from .models import Comments, Article, User


class ReadOnlyAdmin(admin.ModelAdmin):
    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False


@admin.register(User)
class UserAdmin(ReadOnlyAdmin):
    list_display = (
        "id",
        "username",
        "first_name",
        "last_name",
        "email",
        "date_joined",
        "user_type",
    )
    search_fields = ("username", "first_name", "last_name")
    list_filter = ("user_type",)


@admin.register(Article)
class ArticleAdmin(ReadOnlyAdmin):
    list_display = ("id",)


@admin.register(Comments)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "article", "content", "author", "parent", "status")
    search_fields = (
        "content",
        "author__username",
    )
    list_filter = ("status",)
