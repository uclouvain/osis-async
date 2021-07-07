from rest_framework import serializers

from osis_async.models import AsyncTask


class AsyncTaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%d/%m/%Y %H:%M')
    started_at = serializers.DateTimeField(format='%d/%m/%Y %H:%M')
    completed_at = serializers.DateTimeField(format='%d/%m/%Y %H:%M')

    class Meta:
        model = AsyncTask
        fields = [
            "uuid",
            "name",
            "description",
            "state",
            "progression",
            "created_at",
            "started_at",
            "completed_at",
        ]
