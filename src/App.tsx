import React from 'react';
import './App.css';
import CalendarWeeks from "./helpers/calendarWeeks";

function App() {
  const visibleCalendar = new CalendarWeeks()
  return (
    <>
      {
        visibleCalendar.data.map((week, index) => {
          return (
            <>
              <div>Week: {index}</div>
              <div>
                Days: {
                  week.map(day => {
                    return (
                      day.date.toDateString()
                    )
                  })
                }
              </div>
            </>
          )
        })
      }
    </>
  );
}

export default App;

/**
 * 1.
 */
