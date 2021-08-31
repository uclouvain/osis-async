from osis_async.models import AsyncTask


def update_task(
    uuid,
    progression=None,
    description=None,
    state=None,
    started_at=None,
    completed_at=None,
):
    task = AsyncTask.objects.get(uuid=uuid)
    if progression is not None:
        task.progression = progression
    if description is not None:
        task.description = description
    if state is not None:
        task.state = state
    if started_at is not None:
        task.started_at = started_at
    if completed_at is not None:
        task.completed_at = completed_at
    task.save()
