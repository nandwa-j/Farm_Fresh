import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ValidationError
from rest_framework import status, permissions
from .models import User
from .serializers import CreateUserSerializer, UserSerializer

# Configure logging
logger = logging.getLogger(__name__)


# Create user
class CreateUserView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        tags=["Users"],
        request_body=CreateUserSerializer,
        responses={
            201: UserSerializer,
            400: "Validation Error",
            500: "Unexpected Error",
        },
        operation_description="User signup"
    )
    def post(self, request, *args, **kwargs):
        """
        Create a new user
        """
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                valivated_data = serializer.validated_data
                user = User(
                    username=valivated_data["username"]
                )

                user.set_password(valivated_data["password"])
                user.save()

                user_data = UserSerializer(user).data

                logger.debug(f"Created user: {user}")
                return Response(user_data, status=status.HTTP_201_CREATED)
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