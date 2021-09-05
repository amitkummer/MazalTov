from rest_framework import serializers

from birthdays.models import Date

class DateSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    avatar = serializers.ImageField(use_url=False)

    class Meta:
        model = Date
        fields = ['id', 'name', 'birthday', 'owner', 'avatar']
