// components/navigation/navigation.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: String,
      value: undefined
    },
    title: {
      type: String,
      value: undefined
    },
    subTitle: {
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

  },

  lifetimes: {
    attached: function () {
      const app: IAppOption = getApp();
      this.setData({
        menuHeight: app.globalData.navigationInfo.menuHeight,
        menuTop: app.globalData.navigationInfo.menuTop,
      })
    },
  }
})