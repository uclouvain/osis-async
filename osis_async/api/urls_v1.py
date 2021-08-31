from django.urls import path

from osis_async.api.views import AsyncTaskListView

app_name = "osis_async"
urlpatterns = [
    path("", AsyncTaskListView.as_view(), name="task-list"),
]
