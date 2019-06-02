# ng-picture-viewer

angular image-viewer based on ng-zorro-antd and iv-viewer

[![NPM version](https://img.shields.io/npm/v/ng-picture-viewer.svg)](https://www.npmjs.com/package/ng-picture-viewer)

## Example

[Live Example](https://lzhd.github.io/ng-picture-viewer/)

## Usage

### 1. Install

```
npm install ng-picture-viewer --save
```

添加 `ImgViewerModule` 模块到项目中

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import { ImgViewerModule } from 'ng-picture-viewer';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgZorroAntdModule,
    ImgViewerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
#### Global configuration

`ImgViewerModule.forRoot`有两个参数制定全局通用配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ivViewerType | iv-viewer全局配置，见[Options](https://github.com/s-yadav/iv-viewer#Options) | `IvViewerType` | - |
| imageViewerType | 功能提示全局配置，见[ImgViewerType](#ImgViewerType) | `ImgViewerType` | `[]` |

#### ImgViewerType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| zoomInToolTip | 放大功能提示 | `string` | `放大` |
| zoomOutToolTip | 缩小功能提示 | `string` | `缩小` |
| rotateLeftToolTip | 逆时针功能旋转提示 | `string` | `逆时针旋转` |
| rotateRightToolTip | 顺时针功能提示 | `string` | `顺时针旋转` |
| resetToolTip | 重置功能提示 | `string` | `重置` |
| fullScreenToolTip | 全屏功能提示 | `string` | `全屏` |
| downloadToolTip | 下载功能提示 | `string` | `下载` |

### 2. Template

```html
<nz-picture-viewer [images]="images"></nz-picture-viewer>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[imgViewerClass]` | 外部样式类 | `string` | - |
| `[images]` | 图片路径数组 | `string[]` | `[]` |
| `[showOperate]` | 是否显示所有操作功能 | `boolean` | `true` |
| `[zoom]` | 是否显示放大缩小功能 | `boolean` | `true` |
| `[rotate]` | 是否显示旋转功能 | `boolean` | `true` |
| `[reset]` | 是否显示重置功能 | `boolean` | `true` |
| `[fullscreen]` | 是否显示全屏功能 | `boolean` | `true` |
| `[download]` | 是否显示下载功能 | `boolean` | `true` |
| `(prevChange)` | 切换上一张回调函数 | `EventEmitter<number>` | - |
| `(nextChange)` | 切换下一张灰调函数 | `EventEmitter<number>` | - |

## License

The MIT License (see the [LICENSE](https://github.com/lzhd/ng-picture-viewer/blob/master/LICENSE) file for the full text)
