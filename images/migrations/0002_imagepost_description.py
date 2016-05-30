# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagepost',
            name='description',
            field=models.TextField(default=datetime.datetime(2016, 5, 28, 12, 31, 3, 428366, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
