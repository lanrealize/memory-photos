// index.ts
import { bgUrls } from "../../configs/common"
import { preLoadImage } from "../../utils/util"

Page({
  data: {
    scale: "1.1",
    bg: "",
    bgUrls: bgUrls
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

  reloadBgs(): void {
    this.setData({
      bgUrls: bgUrls
    })
  },

  async onLoad() {
    // setTimeout(() => {
    //   this.changeBgWithTimeout(0);
    // }, 500);

    const imgUrl = await preLoadImage("https://upload-images.jianshu.io/upload_images/15219429-5a4407d920ea8a45.jpg");

    this.setBg(imgUrl);
  },

  // onShow() {
  //   this.reloadBgs();
  // }

})
