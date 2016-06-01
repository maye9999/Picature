import uuid
from base64 import b64decode

import time
from django.core.files.base import ContentFile
from django.http import HttpResponse
from .models import ImagePost
from users.models import MyUser
from themes.models import Theme
from django.shortcuts import render

# Create your views here.


def image(request, mid):
    s = "<p>" + mid + "</p>"
    return HttpResponse(s)


def upload_image(request):
    _, data = request.POST['image'].split(',')
    image_name = request.POST['image_name']
    theme_name = request.POST['theme_name']
    theme_content = request.POST['theme']
    user = request.user.myuser
    print(theme_content)

    theme = Theme()
    theme.name = theme_name
    theme.operation = theme_content
    theme.owner = user
    theme.save()

    post = ImagePost()
    post.user = user
    post.theme = theme
    data = b64decode(data)
    image_name = str(uuid.uuid4()) + ".png"
    post.image = ContentFile(data, image_name)
    post.save()
    return HttpResponse("OK")
