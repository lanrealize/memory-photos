// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    scale: "1.1",
    bg: "http://image.lifeprint.site/background.jpg"
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
