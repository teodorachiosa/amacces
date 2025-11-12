import { ResolveFn, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const titleResolver = (title: string) => {
  return `${title} | Am acces?`;
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: titleResolver('Acasă')
  },
  {
    path: 'monitorizare',
    loadComponent: () =>
      import('./pages/monitor/monitor.component').then((m) => m.MonitorComponent),
    title: titleResolver('Monitorizare')
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
