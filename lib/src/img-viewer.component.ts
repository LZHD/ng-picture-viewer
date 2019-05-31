import {AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import ImageViewer from 'iv-viewer';
import {FullScreenViewer} from 'iv-viewer';

@Component({
  selector: 'nz-picture-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})
export class ImgViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() imgViewerClass: string;
  @Input() images: string[]; // 图片地址
  @Input() showOptions = true; // 显示操作按钮
  @Input() showPDFOnlyOption = true; // 显示PDF按钮
  @Input() rotate = true; // 是否旋转
  @Input() download = true; // 是否下载
  @Input() fullscreen = true; // 是否全屏
  @Input() resetZoom = true; // 是否恢复
  @Input() loadOnInit = false; // 初始化加载
  @Input() zoom = true; // 放大缩小
  ROTATE_ANGLE = 90; // 固定旋转角度
  imageViewer$: any; // 图片容器
  fullScreenViewer$: any; // 全屏图像容器
  element: HTMLElement; // 组件根节点
  currentImgIndex = 1; // 当前图片索引
  imgTotal = 0; // 图片总数
  zoomValue = 100; // 缩放最大基数
  isVertical = false; // 是否垂直
  imgRotate = 0; // 图片旋转角度
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.element = this.el.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    this.imgTotal = this.images.length;
  }

  ngAfterViewInit(): void {
    this.initImgViewer();
  }

  initImgViewer() {
    this.imageViewer$ = new ImageViewer(this.element.querySelector('.img-viewer-panel-body-content'));
    this.fullScreenViewer$ = new FullScreenViewer();
    this.showImg();
  }

  zoomInImg() {
    this.zoomValue += 10;
    this.imageViewer$.zoom(this.zoomValue);
  }

  zoomOutImg() {
    if (this.zoomValue === 100) {
      return;
    }
    this.zoomValue -= 10;
    if (this.zoomValue < 0) {
      this.zoomValue = 0;
    }
    this.imageViewer$.zoom(this.zoomValue);
  }

  rotateImg(isClockwise: boolean) {
    this.beforeRotateImg();
    if (isClockwise) {
      this.imgRotate += this.ROTATE_ANGLE;
    } else {
      this.imgRotate -= this.ROTATE_ANGLE;
    }
    this.isVertical = !this.isVertical;
    this.addImgRotate();
  }

  addImgRotate(isAnimation = true) {
    let scale = '';
    if (this.isVertical && this.isImgOverVertical()) {
      scale = `scale(${this.getScale()})`;
    }
    const rotate = `rotate(${this.imgRotate}deg)`;
    if (isAnimation) {
      this.addTransition('iv-snap-image');
      this.addTransition('iv-small-image');
    }
    this.setImgRotate('iv-snap-image', rotate, scale);
    this.setImgRotate('iv-small-image', rotate, scale);
    setTimeout(() => {
      if (isAnimation) {
        this.removeAnimation('iv-snap-image');
        this.removeAnimation('iv-small-image');
      }
    }, 500);
  }

  beforeRotateImg() {
    this.imageViewer$.resetZoom();
    this.imageViewer$.refresh();
  }

  fullscreenImg() {
    this.fullScreenViewer$.show(this.images[this.currentImgIndex - 1]);
    this.addImgRotate(false);
  }

  downloadImg() {
    const download = this.renderer.createElement('a');
    this.renderer.setAttribute(download, 'download', null);
    this.renderer.setAttribute(download, 'display', 'none');
    this.renderer.setAttribute(download, 'href', this.images[this.currentImgIndex - 1]);
    this.renderer.appendChild(this.element, download);
    download.click();
    this.renderer.removeChild(this.renderer, download);
  }

  prevImg() {
    this.isVertical = false;
    this.currentImgIndex --;
    if (this.currentImgIndex <= 0) {
      this.currentImgIndex = this.imgTotal;
    }
    this.showImg();
  }

  nextImg() {
    this.isVertical = false;
    this.currentImgIndex ++;
    if (this.currentImgIndex > this.imgTotal) {
      this.currentImgIndex = 1;
    }
    this.showImg();
  }

  private beforeShowImg() {
    this.imgRotate = 0;
    this.isVertical = false;
    const currentImg = this.element.querySelector('.iv-small-image');
    if (!!currentImg) {
      this.renderer.removeChild(this.element, currentImg);
    }
    this.setStyle('iv-loader', 'visibility', 'auto');
    this.setStyle('options-image-viewer', 'visibility', 'inherit');
  }

  private showImg() {
    this.beforeShowImg();
    this.imageViewer$.load(this.images[this.currentImgIndex - 1]);
  }

  /**
   * 判断旋转后的图片是否超出展示区
   * @returns {boolean}
   */
  private isImgOverVertical(): boolean {
    const imgViewerHeight = this.element.clientHeight;
    const currentImgWidth = this.element.querySelector('.iv-small-image').clientWidth;
    return imgViewerHeight < currentImgWidth + 10;
  }

  /**
   * 计算图片超出后的缩放比例
   * @returns {number}
   */
  private getScale(): number {
    const imgViewerHeight = this.element.querySelector('.img-viewer-panel-body-content').clientHeight;
    const currentImgWidth = this.element.querySelector('.iv-small-image').clientWidth;
    const differenceWidth = currentImgWidth - imgViewerHeight;
    if (differenceWidth >= 250 && differenceWidth < 300) {
      return differenceWidth / imgViewerHeight - 0.1;
    } else if (differenceWidth >= 300 && differenceWidth < 400) {
      return differenceWidth / imgViewerHeight - 0.15;
    } else if (differenceWidth >= 400) {
      return differenceWidth / imgViewerHeight - 0.32;
    } else if (differenceWidth < 0) {
      return 1;
    }
    return 0.6;
  }

  private addTransition(node) {
    this.setStyle(node, 'transition', '0.5s linear');
  }

  private removeAnimation(node) {
    this.setStyle(node, 'transition', 'auto');
  }

  private setImgRotate(node, roate, scale) {
    this.setStyle(node, 'transform', `${roate} ${scale}`);
  }

  private setStyle(node, name, value) {
    const elements = this.doc.querySelectorAll(`.${node}`);
    elements.forEach(ele => this.renderer.setStyle(ele, name, value));
  }

  ngOnDestroy(): void {
    if (!!this.imageViewer$) {
      this.imageViewer$ = this.imageViewer$.destroy();
    }
    if (!!this.fullScreenViewer$) {
      this.fullScreenViewer$ = this.fullScreenViewer$.destroy();
    }
  }
}
