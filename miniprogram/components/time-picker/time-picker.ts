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
    years: [] as string[],
    months: [] as string[],
    days: [] as string[],
    hours: [] as string[],
    minutes: [] as string[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setDateSelectionInitialValues() {
      const dateSelections = getDateSelections();
      this.setData({
        'years': dateSelections.years,
        'months': dateSelections.months,
        'days': dateSelections.days,
        'hours': dateSelections.hours,
        'minutes': dateSelections.minutes
      })
    }
  },

  lifetimes: {
    attached() {
      this.setDateSelectionInitialValues();
    }
  }
})