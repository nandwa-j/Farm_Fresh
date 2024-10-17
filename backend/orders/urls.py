from django.urls import path
from .views import CreateOrderView, GetOrdersView

urlpatterns = [
    path(
        "orders/get-all/", GetOrdersView.as_view(), name="get_orders"
    ),
    path(
        "orders/create/", CreateOrderView.as_view(), name="add_order"
    ),
]