# Generated by Django 2.2.13 on 2021-07-09 16:29

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("base", '0001_initial')
    ]

    operations = [
        migrations.CreateModel(
            name='AsyncTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('description', models.TextField(verbose_name='Description')),
                ('state', models.CharField(choices=[('PENDING', 'Pending'), ('PROCESSING', 'Processing'), ('DONE', 'Done')], default='PENDING', max_length=25, verbose_name='State')),
                ('progression', models.IntegerField(default=0, help_text='In percentage', validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Progression')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('started_at', models.DateTimeField(editable=False, null=True, verbose_name='Started at')),
                ('completed_at', models.DateTimeField(editable=False, null=True, verbose_name='Completed at')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='base.Person')),
                ('time_to_live', models.IntegerField(default=5, help_text='The Time To Live is the duration, in minutes, that the instance of a task will have to be completed. Pass this time, the task will be stop and errored.', validators=[django.core.validators.MinValueValidator(0)], verbose_name='Time To Live')),
            ],
        ),
    ]
