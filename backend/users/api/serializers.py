from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password',None)
        user = super().update(instance,validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
    

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    
    # def validate(self, attrs):
    #     username = attrs.get('username','')
    #     password = attrs.get('password','')
        
    #     if username and password:
    #         user = authenticate(username=username,password=password)
    #         if user:
    #             if user.is_active:
    #                 attrs['user'] = user
    #             else:
    #                 msg = 'User is deactivated.'
    #                 raise serializers.ValidationError(msg)
    #         else:
    #             msg = 'Unable to login with given credentials.'
    #             raise serializers.ValidationError(msg)
    #     else:
    #         msg = 'Must provide username and password both.'
    #         raise serializers.ValidationError(msg)
    #     return attrs