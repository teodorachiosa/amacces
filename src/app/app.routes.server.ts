import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';

import { WaveResultsService } from './services/wave-results.service';
import { WaveReportItem } from '@shared/types/wave-report-item';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'monitorizare/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const waveResultsService = inject(WaveResultsService);
      const allReports = waveResultsService.getData();
      return allReports.map((report: WaveReportItem) => ({ id: report.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
