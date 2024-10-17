from django.db import models
from users.models import User
from products.models import Product

ORDER_STATUS = (
    ("pending", "Pending"),
    ("in_transit", "In Transit"),
    ("delivered", "Delivered")
)

# Order model
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2) 
    status = models.CharField(max_length=50, choices=ORDER_STATUS, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.user.username} - {self.product.name}"
