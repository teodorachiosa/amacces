import { Component, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import waveAllInOne from '../../../../wave/wave-all-in-one.json';
import { WaveReportItem } from '../../shared/types/wave-report-item';

@Component({
  selector: 'ac-monitor',
  imports: [MarkdownComponent],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css',
})
export class MonitorComponent {
  waveReports: WaveReportItem[] = waveAllInOne;

  stripUrl(url: string): string {
    let transformedUrl = url.replace('http://', '');
    transformedUrl = transformedUrl.replace('https://', '');
    transformedUrl = transformedUrl.replace('/', '');
    return transformedUrl;
  }
}
