// app.ts
App<IAppOption>({

  globalData: {
    navigationInfo: {
      menuHeight: undefined,
      menuTop: undefined
    },
    detailsTitle: {
      title: undefined,
      subTitle: undefined
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
    },
    photoCreationDescription: {
      value: undefined,
      subscribers: []
    },
    photoCreationLocation: {
      value: undefined,
      subscribers: []
    },
    updateAlbumPhotosTrigger: {
      subscribers: []
    },
    updateAlbumsTrigger: {
      subscribers: []
    },

    detailsViewMode: {
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

  setPhotoCreationTimestamp(date: string) {
    this.globalData.photoCreationTimestamp.value = date;
    this.globalData.photoCreationTimestamp.subscribers.forEach((callback: (value: string) => void) => callback(date));
  },

  setPhotoCreationDescription(description: string) {
    this.globalData.photoCreationDescription.value = description;
    this.globalData.photoCreationDescription.subscribers.forEach((callback: (value: string) => void) => callback(description));
  },

  updateAlbumPhotosTriggerEmit() {
    this.globalData.updateAlbumPhotosTrigger.subscribers.forEach((callback: () => void) => callback());
  },

  updateAlbumsTriggerEmit() {
    this.globalData.updateAlbumsTrigger.subscribers.forEach((callback: () => void) => callback());
  },

  async setDetailsViewMode(mode: string, refresh: boolean = true) {
    this.globalData.detailsViewMode.value = mode;
    if (refresh) {
      for (const callback of this.globalData.detailsViewMode.subscribers) {
        await callback(mode);
      }
    }
  },

  setPhotoCreationLocation(location: string) {
    this.globalData.photoCreationLocation.value = location;
    this.globalData.photoCreationLocation.subscribers.forEach((callback: (value: string) => void) => callback(location));
  }

})