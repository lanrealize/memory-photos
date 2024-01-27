// components/photo-creation/photo-creation.ts
import { createAlbum } from '../../utils/utils'

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
    photoPath: '',
    photoDescription: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setPhotoPath(path: string) {
      this.setData({
        photoPath: path
      })
    },

    setPhotoDescription(description: string) {
      this.setData({
        photoDescription: description
      })
    },

    onCancelClick() {
      const app: IAppOption = getApp();
      app.setPhotoCreationShown(false);
    },

    async onPublishClick() {
      await createAlbum('广东');
      const app: IAppOption = getApp();
      app.setPhotoCreationShown(false);
      wx.navigateTo({
        url: '/pages/details/details'
      });
    }
  },

  lifetimes: {
    created: function () {
      this.setPhotoPath = this.setPhotoPath.bind(this);
      this.setPhotoDescription = this.setPhotoDescription.bind(this);

      const app: IAppOption = getApp();
      app.globalData.photoCreationPath.subscribers.push(this.setPhotoPath);
      app.globalData.photoCreationDescription.subscribers.push(this.setPhotoDescription);
    },

    attached: function () {
      const app: IAppOption = getApp();
      this.setData({
        menuHeight: app.globalData.navigationInfo.menuHeight,
        menuTop: app.globalData.navigationInfo.menuTop,
      });
      app.setPhotoCreationDescription('最近认识了很多人，但我知道他们都不是你。');
    }
  }
})