import factory

from base.tests.factories.person import PersonFactory
from osis_async.models import AsyncTask


class AsyncTaskFactory(factory.DjangoModelFactory):
    class Meta:
        model = AsyncTask

    person = factory.SubFactory(PersonFactory)
    name = factory.Faker("name")
    description = factory.Faker("name")
    uuid = factory.Faker('uuid4')
