/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    navigationInfo?: any,
    photoCreationShown?: any,
    photoCreationPath?: any,
    photoCreationTimestamp?: any,
    photoCreationDescription?: any,
    updateAlbumPhotosTrigger?: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,

  setNavigationInfo?: any,

  setPhotoCreationShown?: any,

  setPhotoCreationPath?: any,

  setPhotoCreationTimestamp?: any,

  setPhotoCreationDescription?: any,

  updateAlbumPhotosTriggerEmit?: any
}