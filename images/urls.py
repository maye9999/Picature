from django.conf.urls import url
from .views import image
urlpatterns = [
    url(r'^(?P<mid>[0-9]+)/$', image),
    url(r'^(?P<mid>[0-9]+)/likes$', image),
    url(r'^(?P<mid>[0-9]+)/comments', image),
    url(r'^(?P<mid>[0-9]+)/favorites', image),
]
