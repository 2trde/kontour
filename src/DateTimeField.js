import React from 'react'
import {TextField} from './TextField'
import moment from 'moment'
import {getRenderer} from './Renderer'

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
  renderEdit() {
    const props = {
      invalid: this.props.error || this.state.invalid,
      errorText: this.props.error ? this.props.error.join(', ') : '',
      onChange: this.props.onChange.bind(this),
      value: this.props.value,
      disabled: this.props.readOnly,
      placeholder: this.props.placeholder,
      fieldProps: this.props,
      renderTextField: super.renderEdit.bind(this),
      dateTimeText: this.valueToText(this.props.value)
    }
    const Renderer = this.props.editRenderer || getRenderer('DateTimeField', 'edit')
    return <Renderer {...props}/>
  }
}

export {DateTimeField}
