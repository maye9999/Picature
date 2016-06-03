import json
import uuid

from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.messages import get_messages
from django.core.files.base import ContentFile
from django.shortcuts import render, render_to_response, redirect

from avatar.models import Avatar
from users.models import MyUser

import urllib.parse
import urllib.request
import urllib.error
import tempfile

def home(request):
    m = None
    for message in get_messages(request):
        m = message
        break
    if m is None:
        if request.user.is_authenticated():
            return render(request, 'index.html', {"user": True})
        return render(request, 'index.html', {"user": False})
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


def oauth_callback(request):
    code = request.GET['code']
    url = 'https://api.weibo.com/oauth2/access_token'
    values = {
        'client_id': '2027959579',
        'client_secret': 'f839c30fc7681ba271dd28d2356b37d4',
        'grant_type': 'authorization_code',
        'redirect_uri': 'themer.chinacloudapp.cn/callback',
        'code': code
    }
    data = urllib.parse.urlencode(values)
    data = data.encode('ascii')
    req = urllib.request.Request(url, data)
    response = urllib.request.urlopen(req)
    r = response.read().decode('utf-8')
    result = json.loads(r)
    print(result)
    access_token = result['access_token']
    uid = result['uid']
    expire_time = result['expires_in']

    d = get_info(access_token, uid)



    try:
        user = User.objects.get(username=uid)
    except:
        user = User.objects.create_user(uid, 'a@b.c', '********')
        user.save()
    user = authenticate(username=uid, password='********')
    login(request, user)

    with urllib.request.urlopen(d['avatar']) as response:
        data = response.read()
        avatar = Avatar(user=user, primary=True)
        image_name = str(uuid.uuid4()) + ".jpg"
        avatar.avatar = ContentFile(data, image_name)
        avatar.save()

    try:
        ouser = MyUser.objects.get(user=user)
    except:
        ouser = MyUser(user=user)
    ouser.type = 1
    ouser.access_token = access_token
    ouser.expire_time = int(expire_time)
    ouser.username = d['name']
    ouser.save()
    return redirect('/timeline')


def get_info(access_token, uid):
    url = 'https://api.weibo.com/2/users/show.json'
    values = {
        'access_token': access_token,
        'uid': uid
    }
    data = urllib.parse.urlencode(values)
    # data = data.encode('ascii')
    req = urllib.request.Request(url + '?' + data)
    print('data:%s' % data)
    try:
        response = urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        print(e.read().decode('utf8'))
        return None
    r = response.read().decode('utf-8')
    result = json.loads(r)
    screen_name = result['screen_name']
    avatar = result['avatar_large']
    return {'name': screen_name, 'avatar': avatar}
