from django.conf.urls import url
from .views import home, filters
urlpatterns = [
    url(r'^$', home),
    url(r'^filters/(?P<fid>[0-9]+)$', filters),
]
