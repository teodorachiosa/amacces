import { Component } from '@angular/core';
import { CatInABoxComponent } from '../../graphics/cat-in-a-box/cat-in-a-box.component';

@Component({
  selector: 'ac-home',
  imports: [CatInABoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor() {
  }
}
