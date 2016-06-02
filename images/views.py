import uuid
from base64 import b64decode

import time
from django.core.files.base import ContentFile
from django.http import HttpResponse, JsonResponse
from .models import ImagePost
from users.models import MyUser
from themes.models import Theme
from django.shortcuts import render, get_object_or_404


# Create your views here.


def image(request, mid):
    s = "<p>" + mid + "</p>"
    return HttpResponse(s)


def upload_image(request):
    _, data = request.POST['image'].split(',')
    try:
        theme_id = request.POST['theme_id']
    except:
        theme_id = -1
    user = request.user.myuser
    if theme_id == -1:
        theme_name = request.POST['theme_name']
        theme_content = request.POST['theme']
        theme = Theme()
        theme.name = theme_name
        theme.operation = theme_content
        theme.owner = user
        theme.save()
    else:
        theme = get_object_or_404(Theme, id=theme_id)

    post = ImagePost()
    post.user = user
    post.theme = theme
    data = b64decode(data)
    image_name = str(uuid.uuid4()) + ".png"
    post.image = ContentFile(data, image_name)
    post.save()
    return HttpResponse("OK")


def change_image(request):
    id = request.POST['id']
    _, data = request.POST['image'].split(',')
    theme_id = request.POST['theme_id']
    user = request.user.myuser

    theme = get_object_or_404(Theme, id=theme_id)
    post = get_object_or_404(ImagePost, id=id)
    post.theme = theme
    data = b64decode(data)
    post.image = ContentFile(data, post.image.name)
    post.save()

    return HttpResponse("OK")


def get_theme(request):
    """
    Get theme_content & theme_id by image_id
    e.g. /images/get_theme?id=image_id
    :return: JSON {"theme_content": XXX, "theme_id": id}
    """
    id = request.GET['id']

    post = get_object_or_404(ImagePost, id=id)
    theme_content = post.theme.operation
    theme_id = post.theme.id

    return JsonResponse({"theme_content": theme_content, "theme_id": theme_id})
