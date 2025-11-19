import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaveReportItem } from '@shared/types/wave-report-item';
import waveAllInOne from '@wave/wave-all-in-one.json';

@Component({
  selector: 'ac-site-overview',
  imports: [JsonPipe],
  templateUrl: './site-overview.component.html',
  styleUrl: './site-overview.component.css',
})
export class SiteOverviewComponent implements OnInit {
  waveReport?: WaveReportItem;
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.waveReport = waveAllInOne.find(
      (item: WaveReportItem) =>
        item.slug === this.activatedRoute.snapshot.url[0].path
    );
  }
}
