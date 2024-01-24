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

})