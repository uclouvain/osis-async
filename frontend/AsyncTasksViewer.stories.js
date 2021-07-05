import AsyncTasksViewer from './AsyncTasksViewer';
import fetchMock from 'fetch-mock';


const mockAsyncTasks = {
  count: 3,
  results: [
    {
      uuid: '31d69bd7-07e3-4567-a8f3-1aab41d86061',
      name: 'Génération de document',
      description: 'Votre document est en attente de génération',
      state: 'PENDING',
      progression: 0,
      created_at: '07/06/2021 12:22',
      started_at: '07/06/2021 14:22',
      completed_at: null,
    },{
      uuid: 'f66ecf3b-637c-413a-91a7-e318c27ce02f',
      name: 'Génération de document',
      description: 'Votre document est en cours de génération',
      state: 'PROCESSING',
      progression: 45,
      created_at: '07/06/2021 12:22',
      started_at: '07/06/2021 14:22',
      completed_at: null,
    },{
      uuid: '1445bb87-4965-44a5-9889-1b82f49166ec',
      name: 'Génération de document',
      description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
      state: 'DONE',
      progression: 100,
      created_at: '07/06/2021 12:22',
      started_at: '07/06/2021 14:22',
      completed_at: null,
     },
   ],
};

if (process.env.NODE_ENV === 'test') {
  // Mock jQuery for snapshots tests
  window.jQuery = jest.fn(() => ({
    on: () => {},
  }));
}

export const noAsyncTasks = () => {
  fetchMock.restore().get('/', {count: 0, results: []});
  return {
    components: { AsyncTasksViewer },
    template: `<ul class="nav navbar-nav">
                 <AsyncTasksViewer url="/" />
               </ul>`,
  };
};

export const withAsyncTasks = () => {
  fetchMock.restore().get('/', mockAsyncTasks);

  return {
    components: { AsyncTasksViewer },
    template: `
      <ul class="nav navbar-nav">
        <AsyncTasksViewer url="/" :interval="10" />
      </ul>
    `,
  };
};

export const withErrors = () => {
  fetchMock.restore().get('/', { throws: new Error('Failed to fetch') });

  return {
    components: { AsyncTasksViewer },
    template: `
      <ul class="nav navbar-nav">
        <AsyncTasksViewer url="/" :interval="10" />
      </ul>
    `,
  };
};

export default {
  title: 'Global component',
};
