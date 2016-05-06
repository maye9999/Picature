from django.http import HttpResponse, Http404
from django.shortcuts import render, render_to_response
from .models import MyUser


# Create your views here.
def profile(request, uid):
    try:
        u = MyUser.objects.get(id=uid)
    except MyUser.DoesNotExist:
        raise Http404('User Does Not Exist!')
    return render_to_response('users/profile.html', {'user': u})
