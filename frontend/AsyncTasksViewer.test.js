/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */

import { mount } from '@vue/test-utils';
import AsyncTasksViewer from './AsyncTasksViewer.vue';
import fetchMock from "fetch-mock";
import Vue from "vue";

jest.mock('./utils.js');

const mockAsyncTasks = {
  count: 1,
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
    },
  ],
};

describe('component lifecycle', () => {
  fetchMock
   .get('/error?limit=15', {throws: 'This is an error'})
   .get('/?limit=15', mockAsyncTasks, {overwriteRoutes: false});
  it('should mount', async () => {
    const wrapper = mount(AsyncTasksViewer, {
      propsData: {
        url: '/',
      },
      mocks: {
        $t: k => k,
      },
    });

    expect(wrapper.vm.asyncTasks.length).toBe(0);
    await Vue.nextTick(); // wait for request
    await Vue.nextTick(); // wait for loading
    await Vue.nextTick(); // wait for re-rendering
    expect(wrapper.vm.asyncTasks.length).toBe(1);
  });

  it('should display an error if fetching async tasks fail', async () => {
    const wrapper = mount(AsyncTasksViewer, {
      propsData: {
        url: '/error',
      },
      mocks: {
        $t: k => k,
      },
    });
    await Vue.nextTick(); // wait for loading
    await Vue.nextTick(); // wait for re-rendering
    expect(wrapper.text()).toContain('async_tasks_viewer.error_fetch_async_tasks');
    expect(wrapper.vm.asyncTasks.length).toBe(0);
  });
});


describe('component lifecycle', () => {
  const mockAsyncTasks2 = {
    count: 22,
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
        uuid: '1445bb87-4965-44a5-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f49166ed',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f49166ee',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f49a66ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f39166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f49166ef',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-7889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4905-44a5-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82849166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4975-44a5-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1425bb87-4965-44a-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1145bb87-4965-44a5-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a6-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      },
    ],
  };
  let mockAsyncTasks3 = {
    count: 22,
    next: null,
    results: mockAsyncTasks2.results.concat([
      {
        uuid: '1445bb87-4965-44a5-0889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1beff49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82fab166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f4b166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44a5-9889-1b82f491decc',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-c4a5-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      }, {
        uuid: '1445bb87-4965-44c5-9889-1b82f49166ec',
        name: 'Génération de document',
        description: '<a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">Votre document est disponible ici</a>',
        state: 'DONE',
        progression: 100,
        created_at: '07/06/2021 12:22',
        started_at: '07/06/2021 14:22',
        completed_at: '07/06/2021 14:26',
      },
    ]),
  }

  fetchMock.get('/2?limit=15', mockAsyncTasks2)
    .get('/2?limit=30', mockAsyncTasks3);

  it('should display a link to load more tasks if request is too big', async () => {
    const wrapper = mount(AsyncTasksViewer, {
      propsData: {
        url: '/2',
      },
      mocks: {
        $t: k => k,
      },
    });
    await Vue.nextTick(); // wait for request
    await Vue.nextTick(); // wait for loading
    await Vue.nextTick(); // wait for re-rendering
    expect(wrapper.text()).toContain('async_task_viewer.load_more');
    expect(wrapper.vm.asyncTasks.length).toBe(15);
    await wrapper.find('button').trigger('click');
    await Vue.nextTick(); // wait for request
    await Vue.nextTick(); // wait for loading
    await Vue.nextTick(); // wait for re-rendering
    expect(wrapper.vm.pageSize).toBe(30);
    expect(wrapper.vm.asyncTasks.length).toBe(22);
  });
});
