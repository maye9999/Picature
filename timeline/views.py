from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, 'timeline/timeline.html', {"posts": range(5)})


def posts(request):
    return render(request, 'timeline/card.html', {"posts": range(10)})


def photos(request):
    return render(request, 'timeline/image-card.html', {"photos": range(10)})
