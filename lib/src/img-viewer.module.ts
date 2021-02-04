import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgViewerComponent } from './img-viewer.component';
import { ImgViewerConfig } from './img-viewer.config';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    ImgViewerComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzToolTipModule
  ],
  exports: [
    ImgViewerComponent
  ]
})
export class ImgViewerModule {
  static forRoot(config?: ImgViewerConfig): ModuleWithProviders<ImgViewerModule> {
    return {
      ngModule: ImgViewerModule,
      providers: [{provide: ImgViewerConfig, useValue: config}]
    };
  }
}
