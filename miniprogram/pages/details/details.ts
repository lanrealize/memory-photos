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
    this.updatePhotos = this.updatePhotos.bind(this);

    const app: IAppOption = getApp();
    app.globalData.photoCreationShown.subscribers.push(this.setPhotoCreationDisplay);
    addSubstriber(this.updatePhotos, 'updateAlbumPhotosTrigger');

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
    this.setAlbumPhotos(photoList);
  }
})