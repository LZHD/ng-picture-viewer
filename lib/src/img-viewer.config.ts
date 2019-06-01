import {IvViewerType} from './interfaces/iv-viewer.type';
import {ImgViewerType} from './interfaces/img-viewer.type';

export class ImgViewerConfig {
  ivViewerType?: IvViewerType = {
    zoomValue: 100,
    maxZoom: 500,
    snapView: true,
    refreshOnResize: true,
    zoomOnMouseWheel: true,
  };
  imageViewerType?: ImgViewerType = {
    zoomInToolTip: '放大',
    zoomOutToolTip: '缩小',
    rotateLeftToolTip: '逆时针旋转',
    rotateRightToolTip: '顺时针旋转',
    resetToolTip: '重置',
    fullScreenToolTip: '全屏',
    downloadToolTip: '下载',
  };
}
