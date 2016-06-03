from django.conf.urls import url
from .views import themes
urlpatterns = [
    url(r'^', themes),
]
