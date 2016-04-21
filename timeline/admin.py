from django.contrib import admin
from .models import Comment, Tag, Like
# Register your models here.
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Like)