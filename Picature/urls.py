"""Picature URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from editor.views import home


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^u/', include('users.urls')),
    url(r'^images/', include('images.urls')),
    url(r'^themes/', include('themes.urls')),
    url(r'^editor/', include('editor.urls')),
    url(r'^timeline/', include('timeline.urls')),
    url(r'^$', home, name='home')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
