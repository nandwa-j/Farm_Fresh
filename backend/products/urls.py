from django.urls import path
from .views import GetProductsView, CreateProductView

urlpatterns = [
    path(
        "products/get-all/", GetProductsView.as_view(), name="get_products"
    ),
    path(
        "products/create/", CreateProductView.as_view(), name="add_product"
    ),
]