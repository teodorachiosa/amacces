import { RenderMode, ServerRoute } from '@angular/ssr';
import waveAllInOne from '@wave/wave-all-in-one.json';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'monitorizare/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const allReports = waveAllInOne;
      return allReports.map((report) => ({id: report.slug}));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
