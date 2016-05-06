from django.conf.urls import url
from .views import home, filters, editor
urlpatterns = [
    url(r'^$', editor),
    url(r'^filters/(?P<fid>[0-9]+)$', filters),
]
