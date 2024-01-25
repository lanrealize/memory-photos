// components/time-picker/time-picker.ts
import { getDateSelections } from "../../utils/utils"

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
    years: [],
    months: [],
    days: [],
    hours: [],
    minutes: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setDateSelectionInitialValues() {
      const dateSelections = getDateSelections();
      this.setData({
        'data.years': dateSelections.years,
        'data.months': dateSelections.months,
        'data.days': dateSelections.days,
        'data.hours': dateSelections.hours,
        'data.minutes': dateSelections.minutes
      })
    }
  },

  lifetimes: {
    attached() {
      this.setDateSelectionInitialValues();
    }
  }
})