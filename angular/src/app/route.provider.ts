import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/topics',
        name: '::Menu:Topics',
        iconClass: 'fas fa-book',
        order: 100,
        layout: eLayoutType.application,
      },
      {
        path: '/quizzes',
        name: '::Menu:Quizzes',
        iconClass: 'fas fa-question',
        order: 150,
        layout: eLayoutType.application,
      },
      {
        path: '/questions',
        name: '::Menu:Questions',
        iconClass: 'fas fa-question',
        order: 200,
        layout: eLayoutType.application,
      },
    ]);
  };
}
