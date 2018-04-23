import React from 'react'
import {Field} from './Field'
import PropTypes from 'prop-types'

const RenderTextInput = ({invalid, errorText, style, onChange, value}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  style = {...style, display: 'inline-block'}
  return (
    <input type="text" style={ style } title={errorText} className={classNames} onChange={onChange} value={value ? value : ''}/>
  )
}

class TextField extends Field {
  constructor(props) {
    super(props)
    this.state = {
      invalid: (this.props.required && !this.props.value),
      value: this.valueToText(props.value)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.error !== this.props.error) {
      this.setState({value: this.valueToText(nextProps.value),
                     invalid: this.props.required && !nextProps.value})
    }
  }
  onChange(e) {
    const text = e.target.value
    if (text == '') {
      this.setState({value: text, invalid: this.props.required})
      if (this.props.onChange)
        this.props.onChange(null)
    }
    else if (this._isValidText(text)) {
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
    return value
  }
  isValidText(text) {
    if (this.props.regex) {
      return text.match(this.props.regex) 
    }
    return true
  }
  _isValidText(text) {
    return text === null || text === '' || this.isValidText(text)
  }
  textToValue(text) {
    return text
  }
  renderShow() {
    let text = ''
    if (this.props.value)
      text = ''+this.valueToText(this.props.value)
    if (text.trim() == '')
      text = "\u00A0"
    return (
      <span>
        {text}
      </span>
    )
  }
  renderEdit(extraProps) {
    const props = {
      invalid: this.props.error || this.state.invalid,
      errorText: this.props.error ? this.props.error.join(', ') : '',
      className: "form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value,
      ...extraProps
    }
    return <RenderTextInput {...props}/>
  }
}

TextField.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  regex: PropTypes.object,
  error: PropTypes.string
}

export {RenderTextInput, TextField}
