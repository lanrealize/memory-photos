// pages/albums/albums.ts
import { getAlbums } from '../../utils/apis';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: "100",
    albums: [] as object[],
    loading: false,
    style: 'opacity: 1; transition: opacity 0.5s ease-in-out;'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.setPhotoCreationDisplay = this.setPhotoCreationDisplay.bind(this);
    this.updateAlubms = this.updateAlubms.bind(this);

    const app: IAppOption = getApp();
    app.globalData.photoCreationShown.subscribers.push(this.setPhotoCreationDisplay);
    app.globalData.updateAlbumsTrigger.subscribers.push(this.updateAlubms);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    try {
      this.setLoading(true);
      await this.updateAlubms();
    } catch (e) {
      console.log('Failed to updated albums.')
    } finally {
      this.setLoading(false);
    }
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

  setPhotoCreationDisplay(shown: boolean): void {
    this.setData({
      top: shown ? "0" : "100"
    })
  },

  setAlbums(albums: any): void {
    this.setData({
      'albums': albums
    });
  },

  async updateAlubms() {
    try {
      const albumList = await getAlbums();
      this.setFadeInOut();
      this.setAlbums(albumList);
    } catch (e) {
      throw (e);
    }

  },

  setLoading(loading: boolean) {
    this.setData({
      loading: loading
    })
  },

  setFadeInOut() {
    wx.nextTick(() => {
      this.setData({
        style: 'opacity: 0;'
      });
      this.setData({
        style: 'opacity: 1; transition: opacity 0.5s ease-in-out;'
      });
    });
  }
})