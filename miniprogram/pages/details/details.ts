// pages/details/details.ts
import {getAlbumPhotos} from '../../utils/apis';
import {addSubstriber} from '../../utils/utils';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumPhotos: [] as object[],
    top: "100"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.setPhotoCreationDisplay = this.setPhotoCreationDisplay.bind(this);
    this.updatePhotosOder = this.updatePhotosOder.bind(this);

    const app: IAppOption = getApp();
    app.globalData.photoCreationShown.subscribers.push(this.setPhotoCreationDisplay);
    addSubstriber(this.updatePhotos, 'updateAlbumPhotosTrigger');
    app.globalData.detailsViewMode.subscribers.push(this.updatePhotosOder);

    app.setDetailsViewMode('normal');
    await this.updatePhotos();
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

  },

  setAlbumPhotos(albumPhotos: any): void {
    this.setData({
      'albumPhotos': albumPhotos
    });
  },

  setPhotoCreationDisplay(shown: boolean): void {
    this.setData({
      top: shown ? "0" : "100"
    })
  },

  async updatePhotos() {
    const photoList = await getAlbumPhotos();
    const app: IAppOption = getApp();
    const mode = app.globalData.detailsViewMode.value;
    console.log(mode)
    console.log(photoList)
    photoList.sort((a, b) => {
      const dateA = this.parseDate(a.timestamp);
      const dateB = this.parseDate(b.timestamp);
      if ('normal' === mode) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    console.log(photoList);
    this.setAlbumPhotos(photoList);
  },

  async updatePhotosOder(mode: string) {
    const photoList = await getAlbumPhotos();
    photoList.sort((a, b) => {
      const dateA = this.parseDate(a.timestamp);
      const dateB = this.parseDate(b.timestamp);
      if ('normal' === mode) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    this.setAlbumPhotos(photoList);
  },

  parseDate(dateString: string) {
    const [year, month, day, hours, minutes] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }
})