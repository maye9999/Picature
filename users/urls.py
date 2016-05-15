from django.conf.urls import url
from .views import profile, my_login, my_logout, my_register
urlpatterns = [
    url(r'^login', my_login),
    url(r'^logout', my_logout),
    url(r'^register', my_register),
    url(r'^(?P<uid>[0-9]+)/profile$', profile),
    url(r'^(?P<uid>[0-9]+)/images', profile),
    url(r'^(?P<uid>[0-9]+)/favorites', profile),
]
