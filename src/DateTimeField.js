import React from 'react'
import {TextField} from './TextField'
import {RenderTextInput} from './TextField'
import moment from 'moment'

const inputFormat = moment.defaultFormat // 'YYYY-MM-DDTHH:mm:ssZ'
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
    return text == '' ? null : moment(text, displayFormat).utc().format()
  }
  onChangeCal(d) {
    let val = d.utc()
    val = val.seconds(0)
    if (this.props.onChange)
      this.props.onChange(val.format())
  }

  currentMoment() {
    return this.props.value ? moment(this.props.value, inputFormat) : moment()
  }

  onChangeTime(t) {
    const timeParts = t.split(':')
    const hour = parseInt(timeParts[0])
    const min = parseInt(timeParts[1])

    const dateTime = this.currentMoment()
    dateTime.hour(hour)
    dateTime.minute(min)

    if (this.props.onChange)
      this.props.onChange(dateTime.utc().format())
  }
  onShowCalendar(e) {
    this.setState({showCalendar: true})
    e.preventDefault()
  }
  onCalendarClose() {
    this.setState({showCalendar: false})
  }
  renderEdit() {
    const props = {
      invalid: this.props.error || this.state.invalid,
      errorText: this.props.error ? this.props.error.join(', ') : '',
      onChange: this.onChange.bind(this),
      value: this.state.value,
      disabled: this.props.readOnly,
      placeholder: this.props.placeholder,
      fieldProps: this.props,
      ...extraProps
    }
    const Renderer = this.props.editRenderer || getRenderer('DateTimeField', 'edit')
    return <Renderer {...props}/>
  }
}

export {DateTimeField}
