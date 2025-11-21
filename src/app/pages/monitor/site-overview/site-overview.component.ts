import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaveReportItem } from '@shared/types/wave-report-item';
import { WaveResultsService } from 'app/services/wave-results.service';

@Component({
  selector: 'ac-site-overview',
  imports: [JsonPipe],
  templateUrl: './site-overview.component.html',
  styleUrl: './site-overview.component.css',
})
export class SiteOverviewComponent implements OnInit {
  waveReport?: WaveReportItem;
  activatedRoute = inject(ActivatedRoute);
  waveAllInOne = inject(WaveResultsService);

  ngOnInit(): void {
    this.waveReport = this.waveAllInOne.getData().find(
      (item: WaveReportItem) =>
        item.slug === this.activatedRoute.snapshot.url[0].path
    );
  }
}
