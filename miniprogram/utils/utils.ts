import { urlPrefix, devUrlPrefix } from "../configs/network";
import { postAlbums, putAlbums, postPhotos } from './apis'

export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID');
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
                wx.setStorageSync('openID', res.data.openID);
                resolve(res.data.openID);
              },
              fail: (e) => {
                reject(e)
              }
            })
          },
          fail: (e) => { reject(e) }
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

export const uploadImage = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      wx.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res: any) => {
          console.log('get image successfully');
          const picturePath = res.tempFiles[0].tempFilePath;
          resolve(picturePath);
        },
        fail: (e) => {
          console.log('get image failed');
          reject(e);
        }
      })
    } catch (e) {
      reject(e);
    }
  })
}

export const getDateSelections = () => {
  const years = Array.from({ length: 55 }, (_, index) => (index + 1970).toString());
  const months = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0'));
  const hours = Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes
  }
}

export const addImage = async () => {
  const imagePath = await uploadImage();
  const app: IAppOption = getApp();
  app.setPhotoCreationPath(imagePath);
  app.setPhotoCreationShown(true);
}

export const addSubstriber = (func: any, property: string) => {
  const app = getApp();
  const functionString = func.toString();
  const isAlreadySubscribed = app.globalData[property].subscribers.some((subscriber: any) => subscriber.toString() === functionString);
  if (!isAlreadySubscribed) {
    app.globalData[property].subscribers.push(func);
  }
}

export const postPhoto = async (location: string) => {
  try {
    let storageAlbumID = wx.getStorageSync('albumID');
    console.log(`storageAlbumID: ${storageAlbumID}`)
    if (storageAlbumID) {
      console.log('with album')
      await postPhotos();
    } else {
      console.log('without album')
      const albumID = await postAlbums();
      wx.setStorageSync('albumID', albumID);
      await postPhotos();
      const app: IAppOption = getApp();
      const timestamp = app.globalData.photoCreationTimestamp.value.split('-')
      const mainTitle = timestamp[1] + '月'
      const subTitle = timestamp[0] + '·' + location
      await putAlbums(mainTitle, subTitle);
    }
  } catch (e) {
    console.log(e);
  }
}
