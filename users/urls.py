from django.conf.urls import url
from .views import profile
urlpatterns = [
    url(r'^(?P<uid>[0-9]+)/profile$', profile),
    url(r'^(?P<uid>[0-9]+)/images', profile),
    url(r'^(?P<uid>[0-9]+)/favorites', profile),
]
