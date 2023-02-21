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

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    async_tasks_viewer: {
      error_fetch_async_tasks: 'An error occurred while fetching tasks, please try again later.',
      load_more: 'Load more',
      loading: 'Loading',
      no_results: 'No current tasks.',
    },
    async_task: {
      created_at: 'created at',
      started_at: 'started at',
      completed_at: 'completed at',
    },
  },
  'fr-be': {
    async_tasks_viewer: {
      error_fetch_async_tasks: 'Une erreur s\'est produite lors de la récupération des tâches, veuillez réessayer plus tard.',
      load_more: 'Afficher plus',
      loading: 'Chargement',
      no_results: 'Aucune tâche en cours.',
    },
    async_task: {
      created_at: 'demandée le',
      started_at: 'débutée le',
      completed_at: 'terminée le',
    },
  },
};
export const i18n = new VueI18n({
  locale: document.documentElement.lang || 'en',
  messages,
});
