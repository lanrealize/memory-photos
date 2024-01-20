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
    const currentValue = bgUrls[currentIndex];
    this.setBg(currentValue)
    currentIndex = (currentIndex + 1) % bgUrls.length;
    setTimeout(() => this.changeBgWithTimeout(currentIndex), 4000);
  },

  setBg(bgUrl: string): void {
    this.setData({
      bg: bgUrl
    })
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
    console.log('onShow');
  },

  onHide() {
    console.log('onHide');
  }

})
