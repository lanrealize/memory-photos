// index.ts
import {bgUrls} from "../../configs/common"

Page({
  data: {
    scale: "1.1",
    bg: "",
    bgUrls: bgUrls,
    intervalId: ''
  },

  changeBgWithTimeout(currentIndex: number): void {
    console.log(`change bg ${currentIndex}, ${new Date().getSeconds()}`);
    const currentValue = bgUrls[currentIndex];
    this.setBg(currentValue)
    currentIndex = (currentIndex + 1) % bgUrls.length;
    setTimeout(() => this.changeBgWithTimeout(currentIndex), 4000);
  },

  setBg(bgUrl: string): void {
    this.setData({
      bg: bgUrl
    });
  },

  setScale(scale: string): void {
    this.setData({
      scale: scale
    })
  },

  onLoad() {
    this.setBg("https://upload-images.jianshu.io/upload_images/15219429-5a4407d920ea8a45.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp");
    setTimeout(() => {
      this.changeBgWithTimeout(0);
    }, 500);
    console.log('onLoad');
  },

  onHide() {
    console.log('onHide');
  },

  onImageLoad(event: any) {
    console.log(event.currentTarget.dataset.idx);
  },

  onShow() {
    console.log('onShow');
    let bgUrls = this.data.bgUrls;
    let firstElement = bgUrls.shift();
    bgUrls.push(firstElement as string);
    setTimeout(() => {
      this.setData({
        bgUrls: bgUrls
      });
    }, 500);
  }

})
