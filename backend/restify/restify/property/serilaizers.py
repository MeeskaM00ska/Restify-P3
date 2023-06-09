from rest_framework.serializers import ModelSerializer, CharField, IntegerField, DateField, FloatField, DateTimeField, ImageField, FileField
from .models.property import Property, ImageModel
from .models.property_availability import PropertyAvailability
from social.models.comment_model import Comment
from django.core.exceptions import PermissionDenied, ValidationError
import json

class PropertySerializer(ModelSerializer):
    owner_username = CharField(source='owner.username', read_only=True, allow_null=False)
    property_name = CharField()
    city = CharField()
    country = CharField()
    address = CharField()
    num_of_guests = IntegerField()
    num_of_beds = IntegerField()
    property_type = CharField()
    main_pic = FileField()

    class Meta:
        model = Property
        fields = ['property_name', 'owner_username', 'city', 'country', 'address', 'num_of_guests', 'num_of_beds', 'property_type', 'main_pic']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['owner'] = user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['lowest_avail_price'] = instance.lowest_avail_price
        if instance.lowest_avail_price == 1000000000000:
            representation['lowest_avail_price'] = 'N/A'
        representation['property_id'] = instance.id
        return representation
    
class ImageSerializer(ModelSerializer):
    image = FileField()
    belongs_to = IntegerField()

    class Meta:
        model = ImageModel
        fields = ['image', 'belongs_to']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['uploaded_by'] = user
        return super().create(validated_data)

class PropertyDetailSerializer(ModelSerializer):

    class Meta:
        model = Property
        fields = ['property_name', 'city', 'country', 'address', 'num_of_guests', 'num_of_beds', 'property_type']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['owner'] = user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['property_id'] = instance.id
        representation['lowest_avail_price'] = instance.lowest_avail_price
        replies = Comment.objects.filter(target_type='property', target_id=instance.id)
        if len(replies) > 0:
            representation['comments'] = [("user: " + reply.user.username, "content: " + reply.content) for reply in replies]
        representation['host name'] = instance.owner.first_name + ' ' + instance.owner.last_name
        representation['host username'] = instance.owner.username
        representation['host email'] = instance.owner.email
        representation['host phone'] = instance.owner.phone_num

        # get the images of the property
        representation['images'] = []
        images = ImageModel.objects.filter(belongs_to=instance.id)
        for image in images:
            representation['images'].append(image.image.url)

        return representation
    
class PropertyEditSerializer(ModelSerializer):

    class Meta:
        model = Property
        fields = ['property_name', 'city', 'country', 'address', 'num_of_guests', 'num_of_beds', 'property_type']

    def update(self, instance, validated_data):
        instance.property_name = validated_data.get('property_name', instance.property_name)
        instance.city = validated_data.get('city', instance.city)
        instance.country = validated_data.get('country', instance.country)
        instance.address = validated_data.get('address', instance.address)
        instance.num_of_guests = validated_data.get('num_of_guests', instance.num_of_guests)
        instance.num_of_beds = validated_data.get('num_of_beds', instance.num_of_beds)
        instance.property_type = validated_data.get('property_type', instance.property_type)
        # instance.images = validated_data.get('images', instance.images)
        instance.save()
        return instance
    
class AvailabilitySerializer(ModelSerializer):
    start_date = DateField()
    end_date = DateField()
    price = FloatField()

    class Meta:
        model = PropertyAvailability
        fields = ['start_date', 'end_date', 'price']

    def create(self, validated_data):
        user = self.context['request'].user
        property_id = self.context['view'].kwargs['property_id']
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            raise PermissionDenied("Property does not exist.")
        if property.owner != user:
            raise PermissionDenied("You are not the owner of this property.")
        validated_data['property'] = property

        # modify property's lowest price
        if property.lowest_avail_price > validated_data['price']:
            property.lowest_avail_price = validated_data['price']
            property.save()
        return super().create(validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['avail_id'] = instance.id
        representation['property_id'] = instance.property.id
        return representation

class AvailabilityEditSerializer(ModelSerializer):

    class Meta:
        model = PropertyAvailability
        fields = ['start_date', 'end_date', 'price']

    def update(self, instance, validated_data):
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.price = validated_data.get('price', instance.price)
        instance.save()
        return instance
        