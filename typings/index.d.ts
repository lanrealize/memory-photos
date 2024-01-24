/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    navigationInfo?: any,
    photoCreationShown?: any,
    photoCreationPath?: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,

  setNavigationInfo?: any,

  setPhotoCreationShown?: any,

  setPhotoCreationPath?: any
}