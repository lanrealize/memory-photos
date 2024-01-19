// index.ts
import {bgUrls} from "../../configs/common"

Component({
  data: {
    scale: "1.1",
    bg: "http://image.lifeprint.site/background.jpg",
    bgUrls: bgUrls
  },

  methods: {
    changeBg(): void {
      if (this.data.bg == "http://image.lifeprint.site/background.jpg") {
        this.setData({
          bg: "http://image.lifeprint.site/emptyAlbum.jpg"
        });
      } else {
        this.setData({
          bg: "http://image.lifeprint.site/background.jpg"
        })
      }
      console.log("changed bg")
    }
    
  },

  lifetimes: {
    created: function () {
      console.log(this.data.bg)
      setInterval(() => this.changeBg(), 8000)
    },
  }
})
