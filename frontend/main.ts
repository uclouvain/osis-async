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

/* eslint-disable vue/prefer-import-from-vue */
import {createApp} from '@vue/runtime-dom'; // so that it can be spied on
import AsyncTasksViewer from './AsyncTasksViewer.vue';
import {i18n} from './i18n';

interface Props extends Record<string, unknown> {
  url: string,
  interval?: number,
  limit?: number,
}

document.querySelectorAll<HTMLElement>('#async-tasks-viewer').forEach((elem) => {
  const props: Props = {url: "", ...elem.dataset};
  if (typeof elem.dataset.interval !== 'undefined') {
    props.interval = Number.parseInt(elem.dataset.interval);
  }
  if (typeof elem.dataset.limit !== 'undefined') {
    props.limit = Number.parseInt(elem.dataset.limit);
  }
  createApp(AsyncTasksViewer, props).use(i18n).mount(elem);
});
