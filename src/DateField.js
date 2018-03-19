import React from 'react'
import {Field} from './Field'
import {RenderTextInput} from './TextField'
import Calendar from './Calendar'
import {MyModal} from './MyModal'
import moment from 'moment'

class DateField extends Field {
  constructor(props) {
    super(props)
    
    const date = (props) ? moment(props.value, 'YYYY-MM-DD') : moment()
    const text = props.value ? date.format('DD.MM.YYYY') : ""
    this.state = {
      value: text,
      cls: "valid",
      showCalendar: false
    }
  }
  renderShow() {
    const date = this.props.value ? moment(this.props.value) : null
    return (
      <div>
        {date ? date.format('DD.MM.YYYY') : ''}
      </div>
    )
  }
  onChange(e) {
    const newText = e.target.value
    const date = moment(newText, "DD.MM.YYYY", true)
    if (newText.trim() === '') {
      this.setState({value: newText, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(null)
    }
    else if (date.isValid()) {
      this.setState({value: newText, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(date.format('YYYY-MM-DD'))
    }
    else
    {
      this.setState({value: newText, cls: "is-invalid "})
    }
  }
  onChangeCal(d) {
    const val = d.format('YYYY-MM-DD')
    const text = d.format('DD.MM.YYYY')
    this.setState({value: text})
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
    <div>
      <nobr>
      <RenderTextInput {...props}/>
      <button className="btn btn-primary" style={ {display: 'inline-block'} } onClick={(e) => this.onShowCalendar(e)}>...</button>
      </nobr>
      <MyModal width={340} show={this.state.showCalendar} onHide={this.onCalendarClose.bind(this)}>
        <Calendar value={date} onChange={ (d) => this.onChangeCal(d)}/>
      </MyModal>
    </div>)
  }
}

export {DateField}
