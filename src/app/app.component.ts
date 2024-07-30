import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sutra';

  constructor(private router: Router) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     console.log(event.url);
    //     if (!!event.url && event.url.match(/^\/#/)) {
    //       console.log(event.url);
    //       this.router.navigate([event.url.replace('/#', '')]);
    //     }
    //   }
    // });
  }

}
