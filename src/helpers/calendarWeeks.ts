import { ReactNode } from "react";

export interface CalendarWeekDataContent {
  id: number,
  date: Date,
  position: number,
  content: ReactNode
}

export interface CalendarWeekData {
  date: Date,
  content: CalendarWeekDataContent[]
}

class CalendarWeeks {
  middleDate: Date
  showWeeks: number

  private _data: CalendarWeekData[][] = []

  constructor (date: Date = new Date(), showWeeks: number = 4) {
    this.middleDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    this.showWeeks = showWeeks
    this._initializeData()
  }

  get data () {
    return this._data
  }

  //Sunday
  get middleWeekStartDate () {
    const middleWeekStartDate = new Date(this.middleDate)
    middleWeekStartDate.setDate(middleWeekStartDate.getDate() - middleWeekStartDate.getDay())
    return middleWeekStartDate
  }

  //Saturday
  get middleWeekEndDate () {
    const middleWeekEndDate = new Date(this.middleDate)
    middleWeekEndDate.setDate(middleWeekEndDate.getDate() + (6 - middleWeekEndDate.getDay()))
    return middleWeekEndDate
  }

  //Sunday this.showWeeks ago
  get startDate () {
    const startDate = new Date(this.middleDate.getFullYear(), this.middleDate.getMonth(), this.middleDate.getDate())
    startDate.setDate(this.middleWeekStartDate.getDate() - (7 * this.showWeeks))
    return startDate
  }

  //Saturday this.showWeeks after
  get endDate () {
    const endDate = new Date(this.middleDate.getFullYear(), this.middleDate.getMonth(), this.middleDate.getDate())
    endDate.setDate(this.middleWeekEndDate.getDate() + (7 * this.showWeeks))
    return endDate
  }

  setCalendarWeekDays (startDate: Date, dataIndex: number) {
    const localDateCounter = new Date(startDate)
    for (let i = 0; i < 7; i++) {
      this._data[dataIndex].push({
        date: new Date(localDateCounter),
        content: []
      })
      localDateCounter.setDate(localDateCounter.getDate() + 1)
    }
    return localDateCounter
  }

  private _initializeData () {
    const localDateCounter = new Date(this.startDate)
    for (let i = 0; this._data.length < this.showWeeks*2+1; i++) {
      this._data.push([])
      this.setCalendarWeekDays(localDateCounter, i)
      localDateCounter.setDate(localDateCounter.getDate() + 7)
    }
  }

  private static getWeekStartDate (date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    startDate.setDate(startDate.getDate() - startDate.getDay())
    return startDate
  }

  setData (content: CalendarWeekDataContent[]) {
    let contentStart = 0
    let dataStart = 0
    while (contentStart < content.length && dataStart < this._data.length) {
      const contentItem = content[contentStart]
      const weekStartDate = CalendarWeeks.getWeekStartDate(contentItem.date)
      const dataItem = this._data[dataStart]
      if (weekStartDate.toISOString() === dataItem[0].date.toISOString()) {
        this._data[dataStart][contentItem.date.getDay()].content.push(contentItem)
        contentStart++
      } else {
        dataStart++
      }
    }
  }
}


export default CalendarWeeks
