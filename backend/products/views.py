import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError
from rest_framework import status, permissions
from .models import Product
from .serializers import CreateProductSerializer, ProductSerializer

# Configure logging
logger = logging.getLogger(__name__)


# Create product
class CreateProductView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        tags=["Products"],
        request_body=CreateProductSerializer,
        responses={
            201: ProductSerializer,
            400: "Validation Error",
            500: "Unexpected Error",
        },
        operation_description="Create product"
    )
    def post(self, request, *args, **kwargs):
        """
        Create a product
        """
        serializer = CreateProductSerializer(data=request.data)
        if serializer.is_valid():
            try:
                valivated_data = serializer.validated_data
                product = Product(
                    name=valivated_data["name"],
                    price=valivated_data["price"],
                    image=valivated_data["image"]
                )

                product.save()

                product_data = ProductSerializer(product).data

                logger.debug(f"Created product: {product_data}")
                return Response(product_data, status=status.HTTP_201_CREATED)
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


# Get products
class GetProductsView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        tags=["Products"],
        responses={
            201: ProductSerializer,
            400: "Validation Error",
            500: "Unexpected Error",
        },
        operation_description="Get products"
    )
    def get(self, request, *args, **kwargs):
        """
        Get Products
        """
        # Get all products ordered by created_at
        products = Product.objects.all().order_by('-created_at')
        
        # Serialize the products
        serializer = ProductSerializer(products, many=True)
        
        # Return the serialized data as a response
        return Response(serializer.data, status=200)