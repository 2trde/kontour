import React from 'react'
import {TextField} from './TextField'
import moment from 'moment'
import {getRenderer} from './Renderer'

class DateField extends TextField {
  inputFlavor() {
    return 'number'
  }

  valueToText(value) {
    if (typeof(value) == 'string') {
      value = moment(value, "YYYY-MM-DD")
    }
    return (value) ? value.format(this.props.displayPattern) : ''
  }
  isValidText(text) {
    const date = moment(text, this.props.displayPattern, true)
    return date.isValid()
  }
  textToValue(text) {
    return text == '' ? null : moment(text, this.props.displayPattern).format('YYYY-MM-DD')
  }
  onChangeCal(d) {
    const val = d.format('YYYY-MM-DD')
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
    const props = {
      invalid: this.props.error || this.state.invalid,
      textFieldRender: super.renderEdit.bind(this),
      value: this.props.value,
      placeholder: this.props.placeholder,
      showCalendar: this.state.showCalendar,
      onShowCalendar: () => this.setState({showCalendar: true}),
      onHideCalendar: () => this.setState({showCalendar: false}),
      fieldProps: this.props,
      onChange: this.props.onChange.bind(this),
      dateText: this.valueToText(this.props.value)
    }
    return React.createElement(getRenderer('DateField', 'edit'), props, '')
  }
}

DateField.defaultProps = {
  onChange: () => {},
  displayPattern: 'DD.MM.YYYY'
}

export {DateField}
