import { devUrlPrefix } from "../configs/network";

export const postAlbums = async () => {
  return new Promise((resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID');

      if (!openID) {
        reject('Without openId');
      }

      wx.request({
        url: devUrlPrefix + '/users/' + openID + '/albums',
        method: 'POST',
        data: { type: 'createdAlbums' },
        success: (res: any) => {
          resolve(res.data.id)
        },
        fail: (e) => {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const putAlbums = (title: string, subTitle: string) => {
  return new Promise((resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID');
      let albumID = wx.getStorageSync('albumID');
      if (!openID || !albumID) {
        reject('Without openId or albumID');
      }

      wx.request({
        url: devUrlPrefix + '/users/' + openID + '/albums/' + albumID,
        method: 'PUT',
        data: {
          type: 'createdAlbums',
          title: title,
          subTitle: subTitle
        },
        success: (res: any) => {
          resolve(`Album ${albumID} updated.`)
        },
        fail: (e) => {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const getAlbums = async (): Promise<{ images: {imageUrl: string}[] }[]> => {
  return new Promise((resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID');
      if (!openID) {
        reject('Without openID');
      }
      wx.request({
        url: devUrlPrefix + '/users/' + openID + '/albums',
        method: 'GET',
        data: {
          type: 'createdAlbums',
        },
        success: (res: any) => {
          resolve(res.data)
        },
        fail: (e) => {
          reject(e)
        }
      })
    } catch (e) {
      reject(e);
    }
  })
}

export const postPhotos = async () => {
  return new Promise((resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID');
      let albumID = wx.getStorageSync('albumID');
      const app: IAppOption = getApp();
      const photoPath = app.globalData.photoCreationPath.value;
      const photoDescription = app.globalData.photoCreationDescription.value;
      const photoTimestamp = app.globalData.photoCreationTimestamp.value;

      if (!openID || !albumID) {
        reject('Without openId or albumID');
      }
      wx.uploadFile({
        url: devUrlPrefix + '/users/' + openID + '/albums/' + albumID + '/pictures',
        filePath: photoPath,
        name: 'picture',
        formData: {
          description: photoDescription,
          timeStamp: photoTimestamp,
          type: 'createdAlbums'
        },
        success: (res: any) => {
          app.updateAlbumPhotosTriggerEmit();
          resolve(res.data.id);
        },
        fail: (e) => {
          reject(e);
        }
      })
    } catch (e) {
      reject(e);
    }
  })
}

export const getAlbumPhotos = async (): Promise<{timestamp: string}[]> => {
  return new Promise((resolve, reject) => {
    try {
      let openID = wx.getStorageSync('openID');
      let albumID = wx.getStorageSync('albumID');
      if (!openID || !albumID) {
        reject('Without openId or albumID');
      }
      wx.request({
        url: devUrlPrefix + '/users/' + openID + '/albums/' + albumID + '/pictures',
        method: 'GET',
        data: {
          type: 'createdAlbums',
        },
        success: (res: any) => {
          resolve(res.data)
        },
        fail: (e) => {
          reject(e)
        }
      })
    } catch (e) {
      reject(e);
    }
  })
}