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

    setPickerInitialValue() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const currentDay = currentDate.getDate().toString().padStart(2, '0');
      const currentHour = currentDate.getHours().toString().padStart(2, '0');
      const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

      const app: IAppOption = getApp();
      app.setPhotoCreationTimestamp(this.concateDateStrings(currentYear, currentMonth, currentDay, currentHour, currentMinute));
    },

    setValue(date: string) {
      const indices = this.getIndicesFromDate(date);
      this.setData({
        value: indices
      });
    },

    getDateFromIndices(indices: number[]) {
      return this.concateDateStrings(this.data.years[indices[0]], this.data.months[indices[1]], this.data.days[indices[2]], this.data.hours[indices[3]], this.data.minutes[indices[4]])
    },

    concateDateStrings(year: string, month: string, day: string, hour: string, minute: string) {
      return `${year}-${month}-${day}-${hour}-${minute}`
    },

    getIndicesFromDate(date: string) {
      const dateArray = date.split('-');
      return [
        this.data.years.indexOf(dateArray[0]),
        this.data.months.indexOf(dateArray[1]),
        this.data.days.indexOf(dateArray[2]),
        this.data.hours.indexOf(dateArray[3]),
        this.data.minutes.indexOf(dateArray[4])
      ]
    },

    bindChange(event: any) {
      const indices = event.detail.value;
      const app: IAppOption = getApp();
      app.setPhotoCreationTimestamp(this.getDateFromIndices(indices));
    }
  },

  lifetimes: {
    created() {
      this.setValue = this.setValue.bind(this);
      const app: IAppOption = getApp();
      app.globalData.photoCreationTimestamp.subscribers.push(this.setValue);
    },

    attached() {
      this.setDateinitialSelections();
      this.setPickerInitialValue();
    }
  }
})