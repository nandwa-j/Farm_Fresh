from rest_framework import serializers
from .models import Order, OrderItem
from users.serializers import UserSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)
    quantity = serializers.IntegerField()

    class Meta:
        model = OrderItem
        fields = ["product_id", "quantity"]

class CreateOrderSerializer(serializers.Serializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        fields = ["items"]

    def validate_items(self, value):
        """
        Ensure that the list of items is not empty and all quantities are valid.
        """
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")
        for item in value:
            if item['quantity'] <= 0:
                raise serializers.ValidationError(f"Invalid quantity for product {item['product_id']}.")
        return value

class OrderItemDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")
    price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ["product_name", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemDetailSerializer(many=True, read_only=True)
    user = UserSerializer()

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "total_price",
            "status",
            "items",
            "created_at",
            "updated_at"
        ]