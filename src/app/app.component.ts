import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-picture-viewer';
  images = [
    'https://picsum.photos/900/500/?random&' + Math.random(),
    'https://picsum.photos/900/500/?random&' + Math.random(),
    'https://picsum.photos/900/500/?random&' + Math.random(),
    'https://picsum.photos/900/500/?random&' + Math.random(),
  ];
}
