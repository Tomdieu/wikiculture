from django.contrib import admin

# Register your models here.

from .models import Comments,Article,User

admin.site.register(User)
admin.site.register(Article)
admin.site.register(Comments)
