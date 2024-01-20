export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const preLoadImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      wx.downloadFile({
        url: imageUrl,
        success: function (res) {
          if (res.statusCode === 200) {
            console.log('预加载成功:', res.tempFilePath);
            resolve(res.tempFilePath);
          } else {
            console.error('预加载失败，statusCode：', res.statusCode);
            reject(res.statusCode)
          }
        },
        fail: function (e) {
          console.error('预加载失败，error：', e);
          reject(e);
        }
      });
    } catch (e) {
      console.error('预加载失败，error：', e);
      reject(e);
    }
  })
}

export const preLoadImageReturnBase64 = async (imageUrl: string): Promise<string> => {
  const splitArray = imageUrl.split('.');
  const format = splitArray[splitArray.length - 1];
  const tempUrl = await preLoadImage(imageUrl);
  let base64 = wx.getFileSystemManager().readFileSync(tempUrl, 'base64');
  return 'data:image/' + format +';base64,' + base64;
}
