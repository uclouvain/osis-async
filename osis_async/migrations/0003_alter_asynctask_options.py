# Generated by Django 3.2.17 on 2023-02-21 10:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('osis_async', '0002_alter_asynctask_person'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='asynctask',
            options={'ordering': ['-created_at']},
        ),
    ]