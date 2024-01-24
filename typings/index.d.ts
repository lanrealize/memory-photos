/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    navigationInfo?: any,
    photoCreationShown?: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,

  setNavigationInfo?: any,

  setPhotoCreationShown?: any
}