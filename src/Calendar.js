import React, { Component } from 'react';
import moment from 'moment'
import './Calendar.css';

moment.locale("de")

const buttonStyle = {
  height: '30px',
  width: '30px'
}

const YearSelector = ({value, onChange}) => {
  const goBack = () => onChange( value.clone().subtract(1, 'year'))
  const goForward = () => onChange( value.clone().add(1, 'year'))
  return <div className='year-selector'>
    <button style={buttonStyle} onClick={goBack}> &lt;  </button>
      <span> { value.year() } </span>
    <button style={buttonStyle} onClick={goForward}> &gt; </button>
  </div>
}

const MonthSelector = ({value, onChange}) => {
  const goBack = () => onChange( value.clone().subtract(1, 'months'))
  const goForward = () => onChange( value.clone().add(1, 'months'))
  return <div className='month-selector'>
    <button style={buttonStyle} onClick={goBack}> &lt;  </button>
      <span> { value.format('MMMM') } </span>
    <button style={buttonStyle} onClick={goForward}> &gt; </button>
  </div>
}

const Day = ({value, currentDay, onSelectDay}) => {
  let className = 'day'
  if (value.date() === currentDay.date() && value.month() === currentDay.month())
    className = 'current-day'
  else if (value.month() !== currentDay.month())
    className = 'day-other'

  return <div style={{flexGrow: 1}} key={'' + value.date() + '_' + value.month()}
    onClick={(e) => onSelectDay(value)}
    className={className}>
      {value.date()}
    </div>
}

function chunkArray(arr, chunkSize) {
  let list = []
  arr.forEach((el) => {
    if (list.length == 0) list.push([])
    if (list[list.length-1].length >= chunkSize)
      list.push([])
    list[list.length-1].push(el)
  })
  return list
}


const DaysRow = ({children, className}) => {
  const rows = chunkArray(React.Children.toArray(children), 7)

  return rows.map((row, idx) => (
    <div key={idx} style={{display:'flex'}} className={className}>
      { row.map((el,i) => (
        React.cloneElement(el, {style: {flexGrow: 1}})
      ))}
    </div>
  ))
}


class Calendar extends Component {
  onSelectDay(day) {
    if (this.props.onChange)
      this.props.onChange(day)
  }

  /*
   * calculate an integer value for a month including the year
   * so that Dez-2016 < Jan-2017
   */
  totalMonths(m) {
    return m.year()*12+m.month()
  }

  daysToDisplay(date) {
    const firstDayMonth = date.clone().date(1)
    const firstDay = firstDayMonth.clone().subtract(firstDayMonth.day()-1, 'days')
    const days = []
    let day = firstDay
    let finished = false;
    let reachedLastDayOfMonth = false
    let i = 0
    while (!finished && i < 50) {
      days.push(day)
      day = day.clone().add(1, 'd')
      if (this.totalMonths(day) > this.totalMonths(date))
        reachedLastDayOfMonth = true
      if (day.day() === 1 && reachedLastDayOfMonth)
        finished = true
      i = i + 1
    }
    return days
  }

  currentDate() {
    if (this.props.value) {
      if (this.props.value.isValid())
        return this.props.value
      else
        return moment()
    }
    else
    {
      return moment()
    }
  }

  render() {
    const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

    const days = this.daysToDisplay(this.currentDate())
    return <div className="calendar">
      <div className=''>
        <MonthSelector value={this.currentDate()} onChange={this.props.onChange}/>
        <YearSelector value={this.currentDate()} onChange={this.props.onChange}/>
      </div>
      <DaysRow className='week-days'>
        {weekDays.map((wday) => <div key={wday} className="week-day" key={wday}>{wday}</div> )}
      </DaysRow>
      <DaysRow>
        {days.map((d) => <Day key={''+d.date()+'_'+d.month()} value={d} currentDay={this.currentDate()} onSelectDay={(e) => this.onSelectDay(d)}/>)}
      </DaysRow>
    </div>
  } 
}

export default Calendar;
