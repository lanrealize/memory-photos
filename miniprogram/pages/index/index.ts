// index.ts
import { bgUrls } from "../../configs/common"
import { preLoadImageReturnBase64 } from "../../utils/util"

Page({
  data: {
    scale: "1.1",
    bg: "",
    bgUrls: bgUrls,
    bgBase64s: []
  },

  async changeBgWithTimeout(bgBase64: string, currentIndex: number): Promise<void> {
    this.setBg(bgBase64);
    const newBase64 = await preLoadImageReturnBase64(bgUrls[currentIndex]);
    currentIndex = (currentIndex + 1) % bgUrls.length;
    setTimeout(() => this.changeBgWithTimeout(newBase64, currentIndex), 3000);
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

  async onLoad() {
    const bgBase640 = await preLoadImageReturnBase64(bgUrls[0]);
    this.setBg(bgBase640);

    const bgBase641 = await preLoadImageReturnBase64(bgUrls[1]);

    setTimeout(() => {
      this.changeBgWithTimeout(bgBase641, 2);
    }, 500);
  }

})
