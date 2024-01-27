// app.ts
import { getAlbumPhotos } from './utils/apis';

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
    },
    photoCreationDescription: {
      value: undefined,
      subscribers: []
    },
    albumPhotoList: {
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

  async updateAlbumPhotoList() {
    const albumPhotos = await getAlbumPhotos();
    this.globalData.albumPhotoList.subscribers.forEach((callback: (value: any) => void) => callback(albumPhotos));
  }

})