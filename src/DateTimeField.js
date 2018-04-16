import React from 'react'
import {TextField} from './TextField'
import {RenderTextInput} from './TextField'
import Calendar from './Calendar'
import TimeSelector from './TimeSelector'
import {MyModal} from './MyModal'
import moment from 'moment'

const inputFormat = 'YYYY-MM-DDTHH:mm:ss'
const displayFormat = 'DD.MM.YYYY HH:mm'

class DateTimeField extends TextField {
  constructor(props) {
    super(props)
  }

  valueToText(value) {
    if (typeof(value) == 'string') {
      value = moment(value, inputFormat)
    }
    const txt = (value) ? value.format(displayFormat) : ''
    return txt
  }
  isValidText(text) {
    const date = moment(text, displayFormat, true)
    return date.isValid()
  }
  textToValue(text) {
    return text == '' ? null : moment(text, displayFormat).format(inputFormat)
  }
  onChangeCal(d) {
    const val = d.format(inputFormat)
    if (this.props.onChange)
      this.props.onChange(val)
  }
  onChangeTime(t) {
    const dateTime = moment(this.props.value, inputFormat)
    const newDate = dateTime.format('YYYY-MM-DD') + 'T' + t + ':00'
    if (this.props.onChange)
      this.props.onChange(newDate)
  }
  onShowCalendar(e) {
    this.setState({showCalendar: true})
    e.preventDefault()
  }
  onCalendarClose() {
    this.setState({showCalendar: false})
  }
  renderEdit() {
    const dateTime = this.props.value ? moment(this.props.value, inputFormat) : moment()
    const time = dateTime.format('HH:mm')
    return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      { super.renderEdit({style: {width: 'auto', flexGrow: 1}}) } 
      <button className="btn btn-primary" style={ {display: 'inline-block'} } onClick={(e) => this.onShowCalendar(e)}>...</button>
      <MyModal width={525} show={this.state.showCalendar} onHide={this.onCalendarClose.bind(this)}>
        <div style={{display: 'flex'}}>
          <div style={{display: 'inline-block'}}>
            <Calendar value={dateTime} onChange={ (d) => this.onChangeCal(d)}/>
          </div>
          <div style={{marginLeft: '20px', display: 'inline-block'}}>
            <TimeSelector value={time} onChange={ (t) => this.onChangeTime(t)}/>
          </div>
        </div>
      </MyModal>
    </div>)
  }
}

export {DateTimeField}