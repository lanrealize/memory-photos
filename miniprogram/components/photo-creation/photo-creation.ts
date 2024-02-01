// components/photo-creation/photo-creation.ts
import { getRandomWord } from '../../utils/apis';
import { postPhoto } from '../../utils/utils'

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: String,
      value: undefined
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    photoPath: '',
    photoDescription: '',
    isCreating: false,
    isRefreshing: false,
    locationValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setPhotoPath(path: string) {
      this.setData({
        photoPath: path
      })
    },

    setPhotoDescription(description: string) {
      this.setData({
        photoDescription: description
      })
    },

    onCancelClick() {
      const app: IAppOption = getApp();
      app.setPhotoCreationShown(false);
    },

    async onPublishClick() {
      if (this.data.isCreating) {
        return;
      }
      this.setIsCreating(true);
      try {
        const app: IAppOption = getApp();
        const location = app.globalData.photoCreationLocation.value;
        await postPhoto(location, this.properties.page);
        app.setPhotoCreationShown(false);
        const currentPage = getCurrentPages().pop()?.route;
        if (currentPage === 'pages/details/details') {
          return;
        } else {
          wx.navigateTo({
            url: '/pages/details/details'
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.setIsCreating(false);
      }
    },

    setIsCreating(isCreating: boolean) {
      this.setData({
        isCreating: isCreating
      })
    },

    setIsRefreshing(isRefreshing: boolean) {
      this.setData({
        isRefreshing: isRefreshing
      })
    },

    async setDescription() {
      this.setIsRefreshing(true);
      try {
        const app: IAppOption = getApp()
        const description = await getRandomWord();
        app.setPhotoCreationDescription(description);
      } catch(e) {
        console.log(e);
      } finally {
        this.setIsRefreshing(false);
      }
    },

    async onRefreshClick() {
      await this.setDescription();
    },

    setLocationValue(locationValue: string) {
      if (locationValue === this.data.locationValue) {
        return;
      } else {
        this.setData({
          locationValue: locationValue
        });
      }
    },

    onLocationInput(event: any) {
      const location = event.detail.value;
      const app: IAppOption = getApp();
      app.setPhotoCreationLocation(location);
    }
  },

  lifetimes: {
    created: function () {
      this.setPhotoPath = this.setPhotoPath.bind(this);
      this.setPhotoDescription = this.setPhotoDescription.bind(this);
      this.setLocationValue = this.setLocationValue.bind(this);

      const app: IAppOption = getApp();
      app.globalData.photoCreationPath.subscribers.push(this.setPhotoPath);
      app.globalData.photoCreationDescription.subscribers.push(this.setPhotoDescription);
      app.globalData.photoCreationLocation.subscribers.push(this.setLocationValue);
    },

    attached: function () {
      const app: IAppOption = getApp();
      this.setDescription().then(() => {
        this.setData({
          menuHeight: app.globalData.navigationInfo.menuHeight,
          menuTop: app.globalData.navigationInfo.menuTop,
        });
      });
    }
  }
})