import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoSvgComponent } from '../../graphics/logo-svg/logo-svg.component';

@Component({
  selector: 'ac-header',
  imports: [RouterLink, LogoSvgComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
