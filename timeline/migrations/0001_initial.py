# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-20 06:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('image_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='images.ImagePost')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='users.MyUser')),
            ],
        ),
    ]
