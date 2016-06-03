from django.http import HttpResponse
from .models import *
from django.shortcuts import render, get_object_or_404


# Create your views here.


def themes(request):
    tid = request.GET['id']
    theme = get_object_or_404(Theme, id=tid)
    print(theme.operation)
    return HttpResponse(theme.operation)
