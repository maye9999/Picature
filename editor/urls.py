from django.conf.urls import url
from .views import home, editor
urlpatterns = [
    url(r'^$', editor, name='editor'),
]
