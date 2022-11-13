import CalendarWeeks, { CalendarWeekDataContent } from "./calendarWeeks";

test('CalendarWeeks', () => {
  const middle = '13 Nov 2022'

  const testWeeksObject = {
    data: [],
    startDate: new Date('09 Oct 2022'),
    endDate: new Date('10 Dec 2022')
  }
  const content: CalendarWeekDataContent[] = [
    {
      content: (<></>),
      date: new Date('07 Nov 2022'),
      position: 0,
      id: 0
    }
  ]
  const weeks = new CalendarWeeks(new Date(middle))
  expect(weeks.startDate).toEqual(testWeeksObject.startDate)
  expect(weeks.endDate).toEqual(testWeeksObject.endDate)
  weeks.setData(content)
})

export {}
