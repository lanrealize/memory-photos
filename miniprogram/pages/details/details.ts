// pages/details/details.ts
import { getAlbumPhotos, getAlbum } from '../../utils/apis';
import { parseDate } from '../../utils/utils'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumPhotos: [] as object[],
    photoUrls: [] as string[],
    top: "100",
    style: 'opacity: 1; transition: opacity 0.5s ease-in-out;',
    title: "",
    subTitle: '',
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {

    try {
      this.setLoading(true);

      if ((options.openID && options.albumID)) {
        console.log('Is shared');
        wx.setStorageSync('openID', options.openID);
        wx.setStorageSync('albumID', options.albumID);
      }

      let albumID = wx.getStorageSync('albumID');
      const album = await getAlbum(albumID);

      this.setData({
        title: album.title,
        subTitle: album.subTitle
      });

      this.setPhotoCreationDisplay = this.setPhotoCreationDisplay.bind(this);
      this.updatePhotos = this.updatePhotos.bind(this);

      const app: IAppOption = getApp();

      app.globalData.photoCreationShown.subscribers.push(this.setPhotoCreationDisplay);
      app.globalData.updateAlbumPhotosTrigger.subscribers.push(this.updatePhotos);
      app.globalData.detailsViewMode.subscribers.push(this.updatePhotos);

      app.setDetailsViewMode('normal', false);
      await this.updatePhotos();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {

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
    let openID = wx.getStorageSync('openID');
    let albumID = wx.getStorageSync('albumID');
    return {
      title: '你的朋友分享了一段回忆。',
      path: '/pages/details/details?openID=' + openID + '&albumID=' + albumID
    }
  },

  setAlbumPhotos(albumPhotos: any): void {
    this.setData({
      'albumPhotos': albumPhotos
    });
  },

  setPhotoUrls(urls: any): void {
    this.setData({
      'photoUrls': urls
    });
  },

  setPhotoCreationDisplay(shown: boolean): void {
    this.setData({
      top: shown ? "0" : "100"
    })
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
    this.setFadeInOut();
    this.setAlbumPhotos(photoList);
    const bgUrls = photoList.map(item => item.imageUrl);
    this.setPhotoUrls(bgUrls);
  },

  setFadeInOut() {
    this.setData({
      style: 'opacity: 0;'
    });
    wx.nextTick(() => {
      this.setData({
        style: 'opacity: 1; transition: opacity 0.5s ease-in-out;'
      });
    })
  },

  setLoading(loading: boolean) {
    this.setData({
      loading: loading
    })
  },
})