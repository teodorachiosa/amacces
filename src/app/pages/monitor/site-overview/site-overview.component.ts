import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { WaveReportItem } from '@shared/types/wave-report-item';
import { WaveResultsService } from 'app/services/wave-results.service';
import { titleResolver } from '@shared/utilities/title-resolver';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'ac-site-overview',
  imports: [MarkdownComponent],
  templateUrl: './site-overview.component.html',
  styleUrl: './site-overview.component.css',
})
export class SiteOverviewComponent implements OnInit {
  waveReport?: WaveReportItem;
  activatedRoute = inject(ActivatedRoute);
  waveAllInOne = inject(WaveResultsService);
  title = inject(Title);
  waveLastRun = '';

  ngOnInit(): void {
    this.waveReport = this.waveAllInOne
      .getData()
      .find(
        (item: WaveReportItem) =>
          item.slug === this.activatedRoute.snapshot.url[0].path
      );

    if (this.waveReport) {
      this.title.setTitle(titleResolver(this.waveReport?.statistics.pagetitle));
      this.waveLastRun = new Date(this.waveReport.timestamp).toLocaleDateString(
        'ro-RO',
        { day: 'numeric', month: 'long', year: 'numeric' }
      );
    }
  }
}
