from django.conf.urls import url
from .views import home, posts
urlpatterns = [
    url(r'^$', home, name='timeline'),
    url(r'^posts', posts)
]
