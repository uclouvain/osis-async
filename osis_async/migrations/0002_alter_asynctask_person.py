# Generated by Django 3.2.12 on 2022-05-11 15:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
        ('osis_async', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asynctask',
            name='person',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='base.person'),
        ),
    ]