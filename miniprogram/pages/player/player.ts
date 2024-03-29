// pages/player/player.ts
import { getAlbumPhotos } from '../../utils/apis';
import { parseDate } from '../../utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backImageUrls: [] as object[],
    backImageAmount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.updatePhotos();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  async updatePhotos(mode: string = '') {
    const photoList = await getAlbumPhotos();
    let displayMode = '';
    if (!mode) {
      const app: IAppOption = getApp();
      displayMode = app.globalData.detailsViewMode.value;
    } else {
      displayMode = mode;
    }
    photoList.sort((a, b) => {
      const dateA = parseDate(a.timestamp);
      const dateB = parseDate(b.timestamp);
      if ('normal' === displayMode) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    const bgUrls = photoList.map(item => item.imageUrl);
    let indexedBgUrls = bgUrls.map((imageUrl, index) => {
      return {
        imageUrl: imageUrl,
        idx: index
      };
    });
    this.setBgPhotos(indexedBgUrls);
  },

  setBgPhotos(bgUrls: object[]) {
    this.setData({
      backImageUrls: bgUrls,
      backImageAmount: bgUrls.length
    })
  },

  onBackClick() {
    wx.navigateBack();
  },
})