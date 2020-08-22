import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-picture-viewer';
  images = [
    'assets/c1.jpg',
    'assets/c2.jpg',
    'assets/c3.jpg',
    'assets/p1.jpg',
    'assets/p2.jpg',
    'assets/p3.jpg',
  ];
}
