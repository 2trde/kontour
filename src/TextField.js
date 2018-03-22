import React from 'react'
import {Field} from './Field'

const RenderTextInput = ({invalid, onChange, value}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  return (
    <input type="text" style={ {display: 'inline-block'} } className={classNames} onChange={onChange} value={value ? value : ''}/>
  )
}

class TextField extends Field {
  constructor(props) {
    super(props)
    this.state = { invalid: false, value: this.valueToText(props.value) }
  }
  onChange(e) {
    const text = e.target.value
    if (text == '') {
      this.setState({value: text, invalid: false})
      if (this.props.onChange)
        this.props.onChange(null)
    }
    else if (this.isValidText(text)) {
      this.setState({value: text, invalid: false})
      if (this.props.onChange)
        this.props.onChange(this.textToValue(text))
    } else {
      this.setState({value: text, invalid: true})
    }
  }
  valueToText(value) {
    if (value == null)
      return ''
    return ''+value
  }
  isValidText(text) {
    return true 
  }
  textToValue(text) {
    return text
  }
  renderEdit() {
    const props = {
      invalid: this.state.invalid,
      className: "form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value
    }
    return <RenderTextInput {...props}/>
  }
}

export {RenderTextInput, TextField}
