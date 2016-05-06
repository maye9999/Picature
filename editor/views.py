from django.shortcuts import render, render_to_response

# Create your views here.


def home(request):
    return render_to_response('index.html')


def editor(request):
    return render_to_response('editor.html')


def filters(request, fid):
    pass
