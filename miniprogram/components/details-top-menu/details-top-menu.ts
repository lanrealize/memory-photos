// components/details-top-menu/details-top-menu.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

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
        top: app.globalData.navigationInfo.menuHeight + app.globalData.navigationInfo.menuTop
      })
      // console.log(this.data.menuHeight)
    },
  }
})