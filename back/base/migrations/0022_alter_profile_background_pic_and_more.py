# Generated by Django 4.0 on 2022-08-22 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_alter_formanswer_formanswerlike'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='background_pic',
            field=models.ImageField(default='background_pic/default_bgp.png', upload_to='background_pic'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profile_pic',
            field=models.ImageField(default='profile_pic/default_pp.png', upload_to='profile_pic'),
        ),
    ]
