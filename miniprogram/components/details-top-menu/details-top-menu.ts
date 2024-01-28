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
    widthNormal: 2,
    widthReverse: 0,
    colorNormal: '#000000',
    colorReverse: '#808080'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    adjustWidths(event: any) {
      if ('normal'=== event.currentTarget.dataset.item) {
        this.setData({
          widthNormal: 2,
          widthReverse: 0,
          colorNormal: '#000000',
          colorReverse: '#808080'
        })
      } else {
        this.setData({
          widthNormal: 0,
          widthReverse: 2,
          colorNormal: '808080',
          colorReverse: '#000000'
        }) 
      }
    }
  },

  lifetimes: {
    attached: function () {
      const app: IAppOption = getApp();
      this.setData({
        top: app.globalData.navigationInfo.menuHeight + app.globalData.navigationInfo.menuTop
      })
    },
  }
})