// components/time-picker/time-picker.ts
import { getDateSelections, setPickerInitialValue, concateDateStrings } from "../../utils/utils"

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

    setValue(date: string) {
      const indices = this.getIndicesFromDate(date);
      if (JSON.stringify(indices) === JSON.stringify(this.data.value)) {
        return;
      } else {
        this.setData({
          value: indices
        });
      }
    },

    getIndicesFromDate(date: string) {
      const dateArray = date.split('/');
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
      app.setPhotoCreationTimestamp(concateDateStrings(this.data.years[indices[0]], this.data.months[indices[1]], this.data.days[indices[2]], this.data.hours[indices[3]], this.data.minutes[indices[4]]));
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
      setPickerInitialValue();
    }
  }
})