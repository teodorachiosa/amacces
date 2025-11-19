import { Route } from '@angular/router';
import { SiteOverviewComponent } from './pages/monitor/site-overview/site-overview.component';

/**
 * TODO: Refactor route data: https://angular.dev/api/router/Resolve
 */

export interface CustomRoute extends Route {
  emoji?: string;
  children?: CustomRoute[];
}

export const titleResolver = (title: string) => {
  return `${title} | Am acces?`;
};

export const routes: CustomRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: titleResolver('Acasă'),
    emoji: '🏠',
  },
  {
    path: 'monitorizare',
    children: [
      {
        title: titleResolver('Monitorizare'),
        path: '',
        loadComponent: () =>
          import('./pages/monitor/monitor.component').then(
            (m) => m.MonitorComponent
          ),
        emoji: '🖥️',
      },
      {
        title: titleResolver('TODO: Add title'),
        path: ':id',
        loadComponent: () =>
          import('./pages/monitor/site-overview/site-overview.component').then(
            (m) => m.SiteOverviewComponent
          ),
        emoji: '🕵️‍♀️'
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: titleResolver('Pagină indisponibilă'),
  },
];
