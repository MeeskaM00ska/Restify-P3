from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [ 
    path('create/', views.PorpertyCreate.as_view(), name='create'),
    path('edit/<int:property_id>/', views.PorpertyEdit.as_view(), name='edit'),
    path('delete/<int:property_id>/', views.PorpertyDelete.as_view(), name='delete'),
    path('detail/<int:property_id>/', views.PropertyDetail.as_view(), name='detail'),
    path('list/', views.PropertyList.as_view(), name='list'),
    # make a url allow the ower to create the availavility of the specific property
    path('<int:property_id>/avail/add/', views.AvailabilityCreate.as_view(), name='create-availability'),
    path('<int:property_id>/avail/list/', views.AvailabilityList.as_view(), name='list-availability'),
    path('<int:property_id>/avail/<int:avail_id>/edit/', views.AvailabilityEdit.as_view(), name='edit-availability'),
    path('<int:property_id>/avail/<int:avail_id>/delete/', views.AvailabilityDelete.as_view(), name='delete-availability'),

    path('image/create/', views.ImageCreate.as_view(), name='create-image'),
    path('<int:property_id>/images/list/', views.ImageList.as_view(), name='list-images'),
]