from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from .models import User,Comments

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'
        
class CommentCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comments
        fields = '__all__'
        

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(write_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['id', 'article', 'content', 'author', 'parent', 'created_at', 'updated_at', 'replies']

    def get_replies(self, instance):
        replies_qs = instance.replies.all()
        return CommentSerializer(replies_qs, many=True).data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        parent = instance.parent
        representation['parent'] = None  # Set parent to None initially to avoid recursion
        while parent:
            representation['parent'] = {'id': parent.id}  # You may include other fields if needed
            parent = parent.parent
        return representation
    
    def to_representation_replies(self, value):
        return CommentSerializer(value, many=True).data