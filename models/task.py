import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext as _

from base.models.person import Person
from osis_async.models.enums import TaskStates


class AsyncTask(models.Model):
    """Store information about an asynchronous task."""

    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    name = models.CharField(_("Name"), max_length=100)
    description = models.TextField(_("Description"))
    state = models.CharField(
        _("State"),
        choices=TaskStates.choices(),
        default=TaskStates.PENDING.name,
        max_length=25,
    )
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="+")
    progression = models.IntegerField(
        _("Progression"),
        help_text=_("In percentage"),
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100),
        ],
    )

    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    started_at = models.DateTimeField(_("Started at"), editable=False, null=True)
    completed_at = models.DateTimeField(_("Completed at"), editable=False, null=True)
