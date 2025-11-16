import { Component, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import fs from 'fs';

@Component({
  selector: 'ac-monitor',
  imports: [MarkdownComponent],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css',
})
export class MonitorComponent {

}
