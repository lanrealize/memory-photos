// components/photo-player/photo-player.ts
Component({

  properties: {
    imageList: {
      type: Array,
      observer(newVal, _oldVal) {
        let imageList: any[] = []
        for (let i in newVal) {
          imageList.push({
            img: newVal[i].imageUrl,
            idx: newVal[i].idx,
            animate: `animate`
          })
        }
        this.setData({
          playerList: imageList
        })
        wx.nextTick(() => {
          this.startAnimation()
        })
      }
    },

    imageAmount: {
      type: Number,
      default: 0
    },

    needBackground: {
      type: Boolean,
      default: true
    },

    animationDuration: {
      type: Number,
      default: 5000
    },

    backgroundOpacity: {
      type: Number,
      default: 0.5
    }
  },

  data: {
    currentIndex: 0,
    intervalPlay: 0,
    canAnimation: false,
    playerList: [] as object[]
  },

  methods: {
    startAnimation() {
      if (0 != this.data.intervalPlay) {
        return;
      } else {
        this.stopAnimation();
        if (this.data.playerList.length > 1) {
          this.setData({
            canAnimation: true,
            intervalPlay: setInterval(() => {
              if (this.data.currentIndex < this.data.playerList.length - 1) {
                this.setData({
                  currentIndex: this.data.currentIndex + 1
                })
              } else {
                this.setData({
                  currentIndex: 0
                })
              }
            }, this.data.animationDuration)
          })
        }
      };
    },

    stopAnimation() {
      clearInterval(this.data.intervalPlay);
      this.setData({
        intervalPlay: 0,
        canAnimation: false
      });
    }
  },

  lifetimes: {
    attached() {
      const audio = wx.createInnerAudioContext();
      audio.src = "https://freepd.com/music/Study%20and%20Relax.mp3";
      audio.play();
      wx.setInnerAudioOption({
        obeyMuteSwitch: false
      });
      audio.stop();
    }
  }
})