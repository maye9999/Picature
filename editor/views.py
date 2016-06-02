from django.contrib import messages
from django.contrib.messages import get_messages
from django.shortcuts import render, render_to_response, redirect


# Create your views here.


def home(request):
    m = None
    for message in get_messages(request):
        m = message
        break
    if m is None:
        if request.user.is_authenticated():
            return render(request, 'index.html', {"user": request.user})
        return render(request, 'index.html')
    if m.extra_tags == 'login':
        return render(request, 'index.html', {'login_message': m.message})
    if m.extra_tags == 'register':
        return render(request, 'index.html', {'register_message': m.message})


def editor(request):
    if request.user.is_authenticated():
        return render(request, 'editor/editor.html')
    else:
        messages.add_message(request, messages.ERROR, "请登录或注册账号", extra_tags='login')
        return redirect('/')


def filters(request, fid):
    pass
