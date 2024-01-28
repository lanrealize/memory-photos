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
        this.setSelection(2, 0, '#000000', '#808080');
      } else {
        this.setSelection(0, 2, '#808080', '#000000');
      }
    },

    setSelection(widthNormal: any, widthReverse: any, colorNormal: any, colorReverse: any) {
      this.setData({
        widthNormal: widthNormal,
        widthReverse: widthReverse,
        colorNormal: colorNormal,
        colorReverse: colorReverse
      }) 
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