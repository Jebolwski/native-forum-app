# Generated by Django 4.0 on 2022-08-21 07:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0010_remove_form_user_remove_formanswer_user_form_profile_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='level',
            field=models.PositiveIntegerField(default=1, editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='form',
            name='lft',
            field=models.PositiveIntegerField(default=1, editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='form',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Children', to='base.form'),
        ),
        migrations.AddField(
            model_name='form',
            name='rght',
            field=models.PositiveIntegerField(default=1, editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='form',
            name='tree_id',
            field=models.PositiveIntegerField(db_index=True, default=1, editable=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='form',
            name='body',
            field=models.TextField(max_length=160, verbose_name='Form body'),
        ),
        migrations.AlterField(
            model_name='form',
            name='create',
            field=models.DateTimeField(auto_now=True, verbose_name='Create'),
        ),
        migrations.AlterField(
            model_name='form',
            name='edit',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Edit'),
        ),
        migrations.AlterField(
            model_name='form',
            name='goruldu',
            field=models.ManyToManyField(blank=True, related_name='goruldu', to=settings.AUTH_USER_MODEL, verbose_name='Görüldü'),
        ),
        migrations.AlterField(
            model_name='form',
            name='image',
            field=models.FileField(default='default.jpg', upload_to='profilePhotos', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='form',
            name='like',
            field=models.ManyToManyField(blank=True, related_name='form_like', to='base.Profile', verbose_name='Likes'),
        ),
        migrations.AlterField(
            model_name='form',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.profile', verbose_name='Profile'),
        ),
    ]