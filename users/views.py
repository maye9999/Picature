from django.http import HttpResponse
from django.shortcuts import render, render_to_response


# Create your views here.
def profile(request, uid):
    s = "<p>" + uid + "</p>"
    return HttpResponse(s)
