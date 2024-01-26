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
    minutes: [] as string[],
    value: [] as number[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setDateinitialSelections() {
      const dateSelections = getDateSelections();
      this.setData({
        'years': dateSelections.years,
        'months': dateSelections.months,
        'days': dateSelections.days,
        'hours': dateSelections.hours,
        'minutes': dateSelections.minutes
      })
    },

    generateInitialPickerValue() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const currentDay = currentDate.getDate().toString().padStart(2, '0');
      const currentHour = currentDate.getHours().toString().padStart(2, '0');
      const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

      return [
        this.data.years.indexOf(currentYear),
        this.data.months.indexOf(currentMonth),
        this.data.days.indexOf(currentDay),
        this.data.hours.indexOf(currentHour),
        this.data.minutes.indexOf(currentMinute)
      ]
    },

    setPickerInitialValue() {
      const initialValue = this.generateInitialPickerValue();
      this.setData({
        value: initialValue
      })
    },

    getDateFromIndices(indices: number[]) {
      return {
        year: this.data.years[indices[0]],
        month: this.data.months[indices[1]],
        day: this.data.days[indices[2]],
        hour: this.data.hours[indices[3]],
        minute: this.data.minutes[indices[4]]
      }
    },

    bindChange(event: any) {
      const indices = event.detail.value;
      this.setData({
        value: indices
      });
    }
  },

  lifetimes: {
    attached() {
      this.setDateinitialSelections();
      this.setPickerInitialValue();
    }
  }
})