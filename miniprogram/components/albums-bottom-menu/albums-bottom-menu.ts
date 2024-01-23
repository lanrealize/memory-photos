// components/index-bottom-menu/index-bottom-menu.ts
import { uploadImage } from "../../utils/util"

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCreateClick() {
      uploadImage();
    }
  }
})