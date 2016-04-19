from django.conf.urls import url
from .views import themes
urlpatterns = [
    url(r'^(?P<tid>[0-9]+)/', themes),
]
