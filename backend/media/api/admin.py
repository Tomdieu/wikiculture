from django.contrib import admin

# Register your models here.

from .models import File, User


class ReadOnlyAdmin(admin.ModelAdmin):

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False


@admin.register(User)
class UserAdmin(ReadOnlyAdmin):
    list_display = ['id']


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'file')
