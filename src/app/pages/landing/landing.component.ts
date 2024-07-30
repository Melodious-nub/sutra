import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  backgroundImage = '../../../assets/images/backgrounnd.png';
  currentYear = new Date().getFullYear();
}
