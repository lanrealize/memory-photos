// components/photo/photo.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: undefined
    },
    subTitle: {
      type: String,
      value: undefined
    },
    location: {
      type: String,
      value: undefined
    },
    description: {
      type: String,
      value: undefined
    },
    imageUrl: {
      type: String,
      value: undefined
    },
    type: {
      type: String,
      value: undefined
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage() {
      wx.previewImage({
        current: this.properties.imageUrl,
        urls: [this.properties.imageUrl]
      });
    },

    onLongPress() {
      console.log('long')
    }
  }
})