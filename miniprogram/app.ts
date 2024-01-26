// app.ts
App<IAppOption>({

  globalData: {
    navigationInfo: {
      menuHeight: undefined,
      menuTop: undefined
    },
    photoCreationShown: {
      value: undefined,
      subscribers: []
    },
    photoCreationPath: {
      value: undefined,
      subscribers: []
    },
    photoCreationTimestamp: {
      value: undefined,
      subscribers: []
    }
  },

  onLaunch() {
    this.setNavigationInfo();
  },

  setNavigationInfo() {
    const menuInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.navigationInfo.menuHeight = menuInfo.height;
    this.globalData.navigationInfo.menuTop = menuInfo.top;
  },

  setPhotoCreationShown(data: boolean) {
    this.globalData.photoCreationShown.value = data;
    this.globalData.photoCreationShown.subscribers.forEach((callback: (data: boolean) => void) => callback(data));
  },

  setPhotoCreationPath(data: string) {
    this.globalData.photoCreationPath.value = data;
    this.globalData.photoCreationPath.subscribers.forEach((callback: (data: string) => void) => callback(data));
  },

  setPhotoCreationTimestamp(value: number[]) {
    this.globalData.photoCreationTimestamp.value = value;
    this.globalData.photoCreationTimestamp.subscribers.forEach((callback: (value: number[]) => void) => callback(value));
  }

})