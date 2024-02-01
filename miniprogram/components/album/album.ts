// components/album/album.ts
import { deleteAlbum } from "../../utils/apis"

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    albumId: {
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
    opacity: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onViewClick() {
      wx.setStorageSync('albumID', this.properties.albumId);
      wx.navigateTo({
        url: '/pages/details/details'
      });
    },

    setOpacity(opacity: number) {
      this.setData({
        opacity: opacity
      })
    },

    onLongPress() {
      this.setOpacity(1);
    },

    onCoverClick() {
      this.setOpacity(0);
    },

    async onDeleteClick() {
      await deleteAlbum(this.properties.albumId);
      this.setOpacity(0);
    }
  }
})