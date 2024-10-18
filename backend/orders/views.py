import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError
from rest_framework import status, permissions
from .models import Order, OrderItem
from .serializers import CreateOrderSerializer, OrderSerializer
from users.models import User
from products.models import Product
from decimal import Decimal

# Configure logging
logger = logging.getLogger(__name__)


# Create order
class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        tags=["Orders"],
        request_body=CreateOrderSerializer,
        responses={
            201: OrderSerializer,
            400: "Validation Error",
            500: "Unexpected Error",
        },
        operation_description="Create order"
    )
    def post(self, request, *args, **kwargs):
        """
        Create an order with multiple products
        """

        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data

            # Validate that all products exist first
            product_ids = [item["product_id"] for item in validated_data["items"]]
            products = Product.objects.filter(id__in=product_ids)

            if len(products) != len(product_ids):
                missing_ids = set(product_ids) - set(products.values_list('id', flat=True))
                return Response(
                    {"error": f"Products with ids {', '.join(map(str, missing_ids))} not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                # Get user
                user = request.user

                total_price = 0

                # Create a new order
                order = Order(user=user, total_price=total_price)
                order.save()

                # Create order items
                for item in validated_data["items"]:
                    product = products.get(id=item["product_id"])
                    item_price = product.price * item["quantity"]
                    total_price += item_price

                    # Create OrderItem
                    OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item["quantity"],
                    price=product.price
                    )

                # Update order total price
                tax = round(total_price * Decimal('0.16'))
                order.total_price = total_price + tax
                order.save()

                order_data = OrderSerializer(order).data

                logger.debug(f"Created order: {order_data}")
                return Response(order_data, status=status.HTTP_201_CREATED)

            except ValidationError as e:
                logger.error(f"Validation error: {str(e)}")
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                logger.error(f"Unexpected error: {str(e)}")
                return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Get orders
class GetOrdersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        tags=["Orders"],
        responses={
            201: OrderSerializer,
            400: "Validation Error",
            500: "Unexpected Error",
        },
        operation_description="Get orders"
    )
    def get(self, request, *args, **kwargs):
        """
        Get orders
        """
        
        try:
            user = User.objects.get(username=request.user.username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Get all orders ordered by created_at
        orders = Order.objects.filter(user=user).order_by('-created_at')
        
        # Serialize the orders
        serializer = OrderSerializer(orders, many=True)
        
        # Return the serialized data as a response
        return Response(serializer.data, status=200)