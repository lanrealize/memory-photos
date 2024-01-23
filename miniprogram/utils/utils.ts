import { urlPrefix, devUrlPrefix } from "../configs/network";

export const wxLogin = () => {
  return new Promise( (resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID')
      if (openID) {
        console.log('has openID')
        resolve(openID)
      } else {
        console.log('no openID')
        wx.login({
          success: (res) => {
            console.log('login success')
            wx.request({
              url: devUrlPrefix + '/auth/login',
              method: 'POST',
              data: { code: res.code },
              success: (res: any) => { 
                console.log('get openID')
                wx.setStorageSync('openID', res.data.openID)
                resolve(res.data.openID)
              },
              fail: (e) => {
                reject(e)
              }
            })
          },
          fail: (e) => {reject(e)}
        })
      }
    } catch(e) {
      reject(e)
    }
  })
}

export const uploadImage = (): void => {
  wx.chooseMedia({
    count: 1,
    sizeType: ['original', 'compressed'],
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    success: (res: any) => {
      console.log('get image successfully');
      const picturePath = res.tempFiles[0].tempFilePath;
      wx.setStorageSync('picPath', picturePath)
    },
    fail: (e) => {
      console.log('get image failed')
      console.log(e)
    }
  })
}
