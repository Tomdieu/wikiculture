from django.contrib import admin
from django.utils.text import slugify

from .models import User, Article, Category


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
    list_display = ('username', 'first_name', 'last_name', 'email', 'user_type', 'date_joined')
    list_filter = ('user_type', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('username',)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'category', 'status', 'user', 'created_at', 'updated_at')
    list_filter = ('status', 'category', 'user', 'created_at', 'updated_at')
    search_fields = ('title', 'content')

    def save_model(self, request, obj, form, change):
        if not obj.slug:
            obj.slug = slugify(obj.title)
        super().save_model(request, obj, form, change)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)
