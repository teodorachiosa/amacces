import { ResolveFn, Route, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export interface CustomRoute extends Route {
  emoji?: string;
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
    emoji: '🏠'
  },
  {
    path: 'monitorizare',
    loadComponent: () =>
      import('./pages/monitor/monitor.component').then((m) => m.MonitorComponent),
    title: titleResolver('Monitorizare'),
    emoji: '🖥️'
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
