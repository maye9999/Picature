# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-03 16:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20160421_1409'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='access_token',
            field=models.TextField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='myuser',
            name='expire_time',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='myuser',
            name='type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='myuser',
            name='weibo_name',
            field=models.TextField(blank=True, max_length=100),
        ),
    ]