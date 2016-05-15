from django.contrib.messages import get_messages
from django.shortcuts import render, render_to_response

# Create your views here.


def home(request):
    m = None
    for message in get_messages(request):
        m = message
        break
    if m is None:
        return render(request, 'index.html')
    if m.extra_tags == 'login':
        return render(request, 'index.html', {'login_message': m.message})
    if m.extra_tags == 'register':
        return render(request, 'index.html', {'register_message': m.message})


def editor(request):
    return render(request, 'editor.html')


def filters(request, fid):
    pass
