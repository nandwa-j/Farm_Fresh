import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError
from rest_framework import status, permissions
from .models import Order
from .serializers import CreateOrderSerializer, OrderSerializer
from users.models import User
from products.models import Product

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
        Create an order
        """

        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            try:
                validated_data = serializer.validated_data

                # Get user
                try:
                    user = User.objects.get(username=request.user.username)
                except User.DoesNotExist:
                    return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
                # Get a product
                try:
                    product = Product.objects.get(id=validated_data["product_id"])
                except Product.DoesNotExist:
                    return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
                
                order = Order(
                    user=user,
                    product=product,
                    total_price=validated_data["total_price"]
                )

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