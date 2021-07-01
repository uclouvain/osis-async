from django.utils.translation import gettext as _

from base.models.utils.utils import ChoiceEnum


class TaskStates(ChoiceEnum):
    PENDING = _("Pending")
    PROCESSING = _("Processing")
    DONE = _("Done")
