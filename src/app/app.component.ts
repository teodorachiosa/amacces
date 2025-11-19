import { Component, DOCUMENT, Inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CustomRoute, routes } from './app.routes';

@Component({
  selector: 'ac-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  mainHeadingElement: HTMLHeadingElement | null = null;
  mainElement: HTMLElement | null = null;
  headingTitle = '';
  routeEmoji? = '';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    /**
     * When the user first loads the website or refreshes the website, don't change focus management.
     * When the user navigates to a new route:
     *   - if the navigation finished successfully
     *   - if there aren't any fragments in the URL
     *   - if it's not the first load/reload
     * focus h1 if it exists, otherwise, focus the main element.
     */
    this.router.events.subscribe((event) => {
      this.headingTitle = this.document.title.split('|')[0];

      const flatRoutes = routes.flatMap((route) => {
        if ('children' in route) {
          return route.children;
        }

        return route;
      });

      this.routeEmoji = flatRoutes.find(
        (route) => route?.title === this.document.title
      )?.emoji;

      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.fragment === null && event.id !== 1) {
          this.mainHeadingElement = this.document.querySelector('h1');
          this.mainElement = this.document.getElementById('#main');

          if (this.mainHeadingElement) {
            this.mainHeadingElement.focus();
          } else {
            this.mainElement?.focus();
          }
        }
      }
    });
  }
}
