import React from 'react'
import {TextField} from './TextField'
import {RenderTextInput} from './TextField'
import Calendar from './Calendar'
import {MyModal} from './MyModal'
import moment from 'moment'

class DateField extends TextField {
  valueToText(value) {
    if (typeof(value) == 'string') {
      value = moment(value, "YYYY-MM-DD")
    }
    return (value) ? value.format('DD.MM.YYYY') : ''
  }
  isValidText(text) {
    const date = moment(text, "DD.MM.YYYY", true)
    return date.isValid()
  }
  textToValue(text) {
    return text == '' ? null : moment(text, 'DD.MM.YYYY').format('YYYY-MM-DD')
  }
  onChangeCal(d) {
    const val = d.format('YYYY-MM-DD')
    const text = d.format('DD.MM.YYYY')
    if (this.props.onChange)
      this.props.onChange(val)
  }
  onShowCalendar(e) {
    this.setState({showCalendar: true})
    e.preventDefault()
  }
  onCalendarClose() {
    this.setState({showCalendar: false})
  }
  renderEdit() {
    const date = moment(this.props.value, 'YYYY-MM-DD')
    const props = {
      className: this.state.cls + " form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value,
      style: {display: 'inline-block'}
    }
    return (
    <div style={{ width: '100%' }}>
      <nobr>
      { super.renderEdit() } 
      <button className="btn btn-primary" style={ {display: 'inline-block'} } onClick={(e) => this.onShowCalendar(e)}>...</button>
      </nobr>
      <MyModal width={340} show={this.state.showCalendar} onHide={this.onCalendarClose.bind(this)}>
        <Calendar value={date} onChange={ (d) => this.onChangeCal(d)}/>
      </MyModal>
    </div>)
  }
}

export {DateField}
