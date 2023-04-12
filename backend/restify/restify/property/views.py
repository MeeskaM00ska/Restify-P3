from django.shortcuts import render
from .models.property import Property
from .models.property_availability import PropertyAvailability
from .serilaizers import PropertySerializer, AvailabilitySerializer, PropertyEditSerializer, AvailabilityEditSerializer, PropertyDetailSerializer, ImageSerializer
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class PorpertyCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer
    parser_classes = [MultiPartParser]

class PorpertyEdit(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertyEditSerializer

    def get_object(self):
        property_id = self.kwargs['property_id']
        user = self.request.user
        property = Property.objects.get(id=property_id)
        if property.owner != user:
            raise PermissionDenied("You are not the owner of this property.")
        return property
    
    def get(self, request, *args, **kwargs):
        property = self.get_object()
        serializer = PropertySerializer(instance=property)
        return Response(serializer.data)
    
class PorpertyDelete(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer

    def get_object(self):
        property_id = self.kwargs['property_id']
        user = self.request.user
        property = Property.objects.get(id=property_id)
        if property.owner != user:
            raise PermissionDenied("You are not the owner of this property.")
        return property
    
    def delete(self, request, *args, **kwargs):
        property = Property.objects.get(id=self.kwargs['property_id'])
        property.delete()
        return Response("Property deleted successfully.")
    

# view all the properties
# include function for advanced search
class PropertyList(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = []
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = ['property_name', 'city', 'country', 'property_type']
    filterset_fields = ['city', 'country', 'num_of_guests', 'num_of_beds', 'property_type', 'owner']
    ordering_fields = ['num_of_guests', 'num_of_beds', 'lowest_avail_price']

    def get_queryset(self):
        return self.filter_queryset(Property.objects.all())
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = PropertySerializer(queryset, many=True)

        # provide total page numbers
        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(serializer.data, request)
        return Response({'properties': self.paginate_queryset(serializer.data), 'total_pages': paginator.page.paginator.num_pages})
    

# view detail for a certain property
class PropertyDetail(ListAPIView):
    serializer_class = PropertyDetailSerializer

    def get_queryset(self):
        return Property.objects.filter(id=self.kwargs['property_id'])


class AvailabilityCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AvailabilitySerializer


class AvailabilityEdit(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AvailabilityEditSerializer

    def get_object(self):
        avail_id = self.kwargs['avail_id']
        user = self.request.user
        avail = PropertyAvailability.objects.get(id=avail_id)
        if avail.property.owner != user:
            raise PermissionDenied("You are not the owner of this property.")
        return avail
    
    def get(self, request, *args, **kwargs):
        avail = self.get_object()
        serializer = AvailabilitySerializer(instance=avail)
        return Response(self.paginate_queryset(serializer.data))
    

class AvailabilityList(ListAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = []

    def get_queryset(self):
        property_id = self.kwargs['property_id']
        return PropertyAvailability.objects.filter(property=property_id)
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = AvailabilitySerializer(queryset, many=True)

        # provide total page numbers
        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(serializer.data, request)
        return Response({'avails': self.paginate_queryset(serializer.data), 'total_pages': paginator.page.paginator.num_pages})
    

class AvailabilityDelete(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AvailabilitySerializer

    def get_object(self):
        avail_id = self.kwargs['avail_id']
        user = self.request.user
        avail = PropertyAvailability.objects.get(id=avail_id)
        if avail.property.owner != user:
            raise PermissionDenied("You are not the owner of this property.")
        return avail
    
    def delete(self, request, *args, **kwargs):
        # delete the availability first
        avail = PropertyAvailability.objects.get(id=self.kwargs['avail_id'])
        avail.delete()

        # change the lowest_avail_price of the property
        avail_list = PropertyAvailability.objects.filter(property=self.kwargs['property_id'])
        lowest_avail_price = 10000000000
        for avail in avail_list:
            print(avail.price)
            if avail.price < lowest_avail_price:
                lowest_avail_price = avail.price
        property = Property.objects.get(id=self.kwargs['property_id'])
        property.lowest_avail_price = lowest_avail_price
        property.save()
        return Response("Availability deleted successfully.")
    

class ImageCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer


class ImageList(ListAPIView):
    serializer_class = ImageSerializer
    permission_classes = []

    def get_queryset(self):
        return Property.objects.get(id=self.kwargs['property_id']).images.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = ImageSerializer(queryset, many=True)
        return Response(self.paginate_queryset(serializer.data))
