import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImgViewerComponent} from './img-viewer.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [
    ImgViewerComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    ImgViewerComponent
  ]
})
export class ImgViewerModule { }
