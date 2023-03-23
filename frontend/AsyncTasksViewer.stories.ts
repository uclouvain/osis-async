/*
 *
 * OSIS stands for Open Student Information System. It's an application
 * designed to manage the core business of higher education institutions,
 * such as universities, faculties, institutes and professional schools.
 * The core business involves the administration of students, teachers,
 * courses, programs and so on.
 *
 * Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * A copy of this license - GNU General Public License - is available
 * at the root of the source code of this program.  If not,
 * see http://www.gnu.org/licenses/.
 *
 */

import AsyncTasksViewer from './AsyncTasksViewer.vue';
import fetchMock from 'fetch-mock';
import type {EntriesResponse, Entry} from "./interfaces";
import type {Meta, StoryFn} from "@storybook/vue3";

const completedAsyncTask: Entry = {
  uuid: '1445bb87-4965-44a5-9889-1b82f49166ec',
  name: 'Génération de document',
  description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
  state: 'DONE',
  progression: 100,
  created_at: '07/06/2021 12:22',
  started_at: '07/06/2021 14:22',
  completed_at: '07/06/2021 14:26',
};

const mockAsyncTasks: EntriesResponse = {
  count: 22,
  pending_count: 2,
  previous: null,
  next: 'mockAsyncTasks2',
  results: [
    {
      uuid: '31d69bd7-07e3-4567-a8f3-1aab41d86061',
      name: 'Génération de document',
      description: 'Votre document est en attente de génération',
      state: 'PENDING',
      progression: 0,
      created_at: '07/06/2021 12:22',
      started_at: null,
      completed_at: null,
    }, {
      uuid: 'f66ecf3b-637c-413a-91a7-e318c27ce02f',
      name: 'Génération de document',
      description: 'Votre document est en cours de génération',
      state: 'PROCESSING',
      progression: 45,
      created_at: '07/06/2021 12:22',
      started_at: '07/06/2021 14:22',
      completed_at: null,
    }, {
      ...completedAsyncTask,
      uuid: '1445bb87-4965-44a5-9889-1b82f49166ec',
    }, {
      ...completedAsyncTask,
      uuid: '1445bb87-4965-44a5-9889-1b82f49166ed',
    }, {
      ...completedAsyncTask,
      uuid: '1445bb87-4965-44a5-9889-1b82f49166ee',
    }, {
      ...completedAsyncTask,
      uuid: '1445bb87-4965-44a5-9889-1b82f49a66ef',
    },
  ],
};

export const NoAsyncTasks: StoryFn<typeof AsyncTasksViewer> = () => {
  fetchMock.restore().get('*', {count: 0, results: []});
  return {
    components: {AsyncTasksViewer},
    template: `
      <ul class="nav navbar-nav">
        <li id="async-tasks-viewer" class="dropdown">
          <AsyncTasksViewer url="/" />
        </li>
      </ul>`,
  };
};

export const WithAsyncTasks: StoryFn<typeof AsyncTasksViewer> = () => {
  const currentAsyncTaskPage = {...mockAsyncTasks};
  fetchMock.restore()
      .get('/?limit=15', function () {
        currentAsyncTaskPage.results = mockAsyncTasks.results.slice(0, 15);
        return currentAsyncTaskPage;
      })
      .get('/?limit=30', function () {
        currentAsyncTaskPage.results = mockAsyncTasks.results;
        currentAsyncTaskPage.next = null;
        return currentAsyncTaskPage;
      });

  return {
    components: {AsyncTasksViewer},
    template: `
      <ul class="nav navbar-nav">
        <li id="async-tasks-viewer" class="dropdown">
          <AsyncTasksViewer url="/" :interval="10" />
        </li>
      </ul>
    `,
  };
};

export const WithErrors: StoryFn<typeof AsyncTasksViewer> = () => {
  fetchMock.restore().get('*', {throws: new Error('Failed to fetch')});

  return {
    components: {AsyncTasksViewer},
    template: `
      <ul class="nav navbar-nav">
      <AsyncTasksViewer url="/" :interval="10" />
      </ul>
    `,
  };
};


export const EventFetchAsyncTasks: StoryFn<typeof AsyncTasksViewer> = () => {
  fetchMock.restore().get('*', {count: 0, results: []});

  return {
    components: { AsyncTasksViewer },
    template: `
      <div class="clearfix">
        <ul class="nav navbar-nav clearfix">
          <li id="async-tasks-viewer" class="dropdown">
            <AsyncTasksViewer url="/" />
          </li>
        </ul>
      </div>
      <button onclick="let customEvent=new CustomEvent('AsyncTasksViewer:fetchAsyncTasks'); document.dispatchEvent(customEvent); ">
        Refresh via custom event
      </button>
    `,
  };
};

export default {
  title: 'Global component',
  component: AsyncTasksViewer,
} as Meta<typeof AsyncTasksViewer>;
