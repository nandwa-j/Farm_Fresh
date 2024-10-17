from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import MinLengthValidator, RegexValidator

# User model
class User(AbstractUser):
    username = models.CharField(validators=[MinLengthValidator(6)], max_length=20, unique=True, db_index=True)
    password = models.CharField(validators=[MinLengthValidator(8)], max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    groups = models.ManyToManyField(Group, related_name="custom_user_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_set_permissions", blank=True)

    def __str__(self):
        return f"Created user with username {self.username}"
