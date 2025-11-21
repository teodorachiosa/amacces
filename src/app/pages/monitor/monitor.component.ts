import { Component, inject, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { WaveReportItem } from '@shared/types/wave-report-item';
import { RouterLink } from '@angular/router';
import { WaveResultsService } from 'app/services/wave-results.service';

@Component({
  selector: 'ac-monitor',
  imports: [MarkdownComponent, RouterLink],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css',
})
export class MonitorComponent implements OnInit {
  waveResultsService = inject(WaveResultsService);
  waveReports: WaveReportItem[] = [];

  ngOnInit(): void {
    this.waveReports = this.waveResultsService.getData();
  }

  stripUrl(url: string): string {
    let transformedUrl = url.replace('http://', '');
    transformedUrl = transformedUrl.replace('https://', '');
    transformedUrl = transformedUrl.replace('/', '');
    return transformedUrl;
  }

}
