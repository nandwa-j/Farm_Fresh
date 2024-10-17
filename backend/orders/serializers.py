from rest_framework import serializers
from .models import Order


class CreateOrderSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = [
            "product_id",
            "total_price",
            "status"
        ]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "product",
            "total_price",
            "status",
            "created_at",
            "updated_at"
        ]