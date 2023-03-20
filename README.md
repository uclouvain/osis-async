# OSIS Async

`OSIS Async` is a Django application to create and display asynchronous tasks across OSIS platform.


Requirements
===========

`OSIS Async` requires

- Django 2.2+
- Django REST Framework 3.12+
- Vue 3

# How to install ?

## For production

```bash
# From your osis install, with python environment activated
pip install git+https://github.com/uclouvain/osis-async.git@dev#egg=osis_async
```

## For development

```bash
# From your osis install, with python environment activated
git clone git@github.com:uclouvain/osis-async.git
pip install -e ./osis-async
```

## Configuring Django

Add `osis_async` to `INSTALLED_APPS` and apply migrations :

```python
INSTALLED_APPS = (
    ...,
    'osis_async',
)
```

# Using OSIS Async

`osis_async` provides an API to create and manage async tasks and also a VueJS component to view them in the interface.

## Create an async task

Initialize an object describing the notification you want to send: 

```python
from osis_async.models.task import AsyncTask

task_uuid = AsyncTask.objects.create(
    name="My task name",
    description="My task longer description",
    person=person,  # Person for which to display the task
    time_to_live=5,  # Time-to-live in minutes
).uuid
# Store its uuid for easy retrieval
```

## Update an async task

It is the implementer role's to start and update its async tasks, you can use the `update_task()` for that matter:

```python
from django.utils.timezone import now
from osis_async.utils import update_task
from osis_async.models.enums.task import TaskState

update_task(uuid, state=TaskState.PROCESSING, started_at=now())
update_task(uuid, progression=50)
update_task(uuid, state=TaskState.DONE, completed_at=now())
```

# Integrate the front async component

Make the dependencies available:
```html
<!-- Dependencies if not already added -->
<link rel="stylesheet" href="https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.min.css">
<script type="text/javascript" src="https://unpkg.com/jquery"></script>
<script type="text/javascript" src="https://unpkg.com/bootstrap@3.3.7/dist/js/bootstrap.js"></script>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n@8"></script>

<!-- Dependencies if not already added -->
<link href="{% static 'osis_async/osis-async.css' %}" rel="stylesheet"/>

<!-- This line must go at the end of the file -->
<script type="text/javascript" src="{% static 'osis_async/osis-async.umd.js' %}"></script>

```

Then you can integrate the component:
```html
<div id="async-tasks-viewer" data-url="{% url 'osis_async:task-list' %}" data-interval="300"></div>
```

 - `data-url` : API endpoint that returns all the tasks.
 - `data-interval` : The interval, in seconds, to fetch tasks from server (default to 300).

# Update the front async component via custom event
```html
   <script>
        let customEvent=new CustomEvent('AsyncTasksViewer:fetchAsyncTasks');
        document.dispatchEvent(customEvent);
   </script>