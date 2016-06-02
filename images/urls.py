from django.conf.urls import url
from .views import *
urlpatterns = [
    url(r'^(?P<mid>[0-9]+)/$', image),
    url(r'^upload/$', upload_image),
    url(r'^change/$', change_image),
    url(r'^get_theme/$', get_theme),
    url(r'^(?P<mid>[0-9]+)/likes$', image),
    url(r'^(?P<mid>[0-9]+)/comments', image),
    url(r'^(?P<mid>[0-9]+)/favorites', image),
]
