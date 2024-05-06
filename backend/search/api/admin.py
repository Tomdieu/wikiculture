from django.contrib import admin

from .models import Article,User

# Register your models here.

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
        "username",
        "first_name",
        "last_name",
        "email",
        "user_type",
        "date_joined",
    )
    list_filter = ("user_type", "date_joined")
    search_fields = ("username", "first_name", "last_name", "email")
    ordering = ("username",)
    
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    
    list_display = ["id", "title", "content", "tags", "categories", "author", "slug"]
    search_fields = ['categories','title','content','author__username']