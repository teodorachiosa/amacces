import { Injectable } from '@angular/core';
import { WaveReportItem } from '@shared/types/wave-report-item';
import waveAllInOne from '@wave/wave-all-in-one.json';

@Injectable({ providedIn: 'root' })
export class WaveResultsService {
  /* Return WAVE results coming from the "wave" script */
  getData(): WaveReportItem[] {
    return waveAllInOne;
  }
}
