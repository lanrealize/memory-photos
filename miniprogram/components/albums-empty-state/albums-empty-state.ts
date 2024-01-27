// components/albums-empty-state/albums-empty-state.ts
import { addImage } from "../../utils/utils"

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
    async onCreateClick() {
      await addImage();
    }
  }
})