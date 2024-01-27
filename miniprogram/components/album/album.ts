// components/album/album.ts
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
    description: {
      type: String,
      value: undefined
    },
    mainImageUrl: {
      type: String,
      value: undefined
    },
    subImageUrl0: {
      type: String,
      value: undefined
    },
    subImageUrl1: {
      type: String,
      value: undefined
    },
    subImageUrl2: {
      type: String,
      value: undefined
    },
    subImageUrl3: {
      type: String,
      value: undefined
    },
    subImageUrl4: {
      type: String,
      value: undefined
    },
    subImageUrl5: {
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
    onViewClick() {
      wx.navigateTo({
        url: '/pages/details/details'
      });
    }
  }
})