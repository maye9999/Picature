from django.conf.urls import url
from .views import *
urlpatterns = [
    url(r'^$', home, name='timeline'),
    url(r'^posts', posts),
    url(r'^photos', photos),
    url(r'^like', like),
    url(r'^like', unlike),
    url(r'^comments', comments),
    url(r'^add-comment', add_comment),
]
