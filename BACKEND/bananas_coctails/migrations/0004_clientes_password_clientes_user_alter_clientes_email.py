# Generated by Django 5.0.7 on 2024-07-28 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bananas_coctails", "0003_alter_clientes_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="clientes",
            name="password",
            field=models.CharField(default="", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="clientes",
            name="user",
            field=models.CharField(default="", max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="clientes",
            name="email",
            field=models.EmailField(max_length=100),
        ),
    ]
