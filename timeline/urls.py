from django.conf.urls import url
from .views import home, posts, photos
urlpatterns = [
    url(r'^$', home, name='timeline'),
    url(r'^posts', posts),
    url(r'^photos', photos),
]
