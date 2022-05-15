import { useEffect, useState } from 'react'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'

const Calendar = ({ onChange, selectedDate }) => {
  const [selectedDay, setSelectedDay] = useState(null)
  useEffect(() => {
    if (selectedDate) {
      const splitDate = selectedDate.split('/')
      setSelectedDay({ year: parseInt(splitDate[0]), month: parseInt(splitDate[1]), day: parseInt(splitDate[2]) })
    }
  }, [selectedDate])
  return (
    <DatePicker
      value={selectedDay}
      onChange={value => {
        setSelectedDay(value)
        onChange(
          `${value.year}/${value.month < 10 ? '0'.concat(value.month) : value.month}/${value.day < 10 ? '0'.concat(value.day) : value.day}`,
        )
      }}
      shouldHighlightWeekends
      locale="fa" // add this
      i
    />
  )
}

export default Calendar
