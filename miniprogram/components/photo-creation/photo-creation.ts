// components/photo-creation/photo-creation.ts
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
    photoPath: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setPhotoPath(path: string) {
      this.setData({
        photoPath: path
      })
    }
  },

  lifetimes: {
    created: function () {
      this.setPhotoPath = this.setPhotoPath.bind(this);

      const app: IAppOption = getApp();
      app.globalData.photoCreationPath.subscribers.push(this.setPhotoPath);
      console.log("Add subscriber for updated photo path.");
    },
  }
})