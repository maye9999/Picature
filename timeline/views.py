import functools

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from images.models import ImagePost
from .models import *


# Create your views here.

def home(request):
    if not request.user.is_authenticated():
        messages.add_message(request, messages.ERROR, "请登录或注册账号", extra_tags='login')
        return redirect('/')
    postss = query_posts(1)
    return render(request, 'timeline/timeline.html', {"posts": postss, "user": request.user.myuser})


def posts(request):
    try:
        page = int(request.GET['page'])
    except:
        page = 1
    try:
        name = request.GET['name']
    except:
        name = ""
    postss = query_posts(page, name)
    return render(request, 'timeline/card.html', {"posts": postss, "user": request.user.myuser})


def photos(request):
    return render(request, 'timeline/image-card.html', {"photos": range(10)})


def comments(request):
    """
    Use GET method containing 'post-id'(ImagePost id number)
    e.g. timeline/comments?post-id=123
    :return: comments list or 404
    """
    id = request.GET['post-id']
    image_post = get_object_or_404(ImagePost, id=id)
    comments = image_post.comments
    return render(request, 'timeline/comments.html', {'comments': comments, "post": image_post})


def add_comment(request):
    """
    Use POST method containing 'post-id'(ImagePost id number), 'content'(Comment Content)
    :return: comments list or 404
    """
    if request.user.is_authenticated():
        user = request.user.myuser
        id = request.POST['post-id']
        image_post = get_object_or_404(ImagePost, id=id)
        content = request.POST['content']

        comment = Comment(user=user, content=content, image_post=image_post)
        comment.save()

        comments = image_post.comments
        return render(request, 'timeline/comments.html', {'comments': comments, "post": image_post})
    else:
        messages.add_message(request, messages.ERROR, "请登录或注册账号", extra_tags='login')
        return redirect('/')


def like(request):
    """
    Use GET method containing 'post-id'(ImagePost id number)
    e.g. timeline/like?post-id=123
    """
    id = request.GET['post-id']
    image_post = get_object_or_404(ImagePost, id=id)
    user = request.user.myuser
    user.like_images.add(image_post)
    user.save()
    return HttpResponse("OK")


def unlike(request):
    """
    Use GET method containing 'post-id'(ImagePost id number)
    e.g. timeline/unlike?post-id=123
    """
    id = request.GET['post-id']
    image_post = get_object_or_404(ImagePost, id=id)
    user = request.user.myuser
    user.like_images.remove(image_post)
    user.save()
    return HttpResponse("OK")


def tags(request):
    id = request.GET['post-id']
    image_post = get_object_or_404(ImagePost, id=id)
    tags = image_post.tags


def query_posts(page, name=""):
    return ImagePost.objects.filter(is_private=False).filter(theme__name__icontains=name).order_by('-upload_time')[page*10-10:page*10]
