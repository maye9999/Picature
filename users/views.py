from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import HttpResponse, Http404
from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from .models import MyUser


# Create your views here.
def home(request):
    if not request.user.is_authenticated():
        messages.add_message(request, messages.ERROR, "请登录或注册账号", extra_tags='login')
        return redirect('/')
    uid = request.user.myuser.id
    return redirect('/u/' + str(uid) + '/profile')


def profile(request, uid):
    if not request.user.is_authenticated():
        messages.add_message(request, messages.ERROR, "请登录或注册账号", extra_tags='login')
        return redirect('/')
    user = get_object_or_404(MyUser, id=uid)
    own_posts = user.images
    fav_posts = user.like_images

    return render(request, 'users/profile.html', {"posts": own_posts, "favorites": fav_posts, "user": user})


def my_login(request):
    username = request.POST['username']
    password = request.POST['password']
    print(password)
    print(username)
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        print(user)
        if not request.POST.get('remember', None):
            request.session.set_expiry(0)
        # Redirect to a success page.
        return redirect("/timeline")
    # Login Failed
    messages.add_message(request, messages.ERROR, "用户名或密码错误", extra_tags='login')
    return redirect('/')


def my_logout(request):
    logout(request)
    return redirect('/')


def my_register(request):
    username = request.POST['username']
    password1 = request.POST['password1']
    password2 = request.POST['password2']

    if password1 != password2:
        messages.add_message(request, messages.ERROR, "密码不一致", extra_tags='register')
        return redirect('/')

    if len(password1) < 8:
        messages.add_message(request, messages.ERROR, "密码长度太短", extra_tags='register')
        return redirect('/')

    try:
        u = User.objects.get(username=username)
        # Invalid Username
        messages.add_message(request, messages.ERROR, "用户名已存在", extra_tags='register')
        return redirect('/')
    except User.DoesNotExist:
        # Valid Username
        u = User.objects.create_user(username, password=password1)
        u.save()
        u = authenticate(username=username, password=password1)
        login(request, u)

        mu = MyUser()
        mu.user = u
        mu.type = 0
        mu.username = username
        mu.save()
    return redirect('/')
