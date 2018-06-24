import React from 'react'
import {Field} from './Field'
import PropTypes from 'prop-types'
import {getRenderer} from './Renderer'

const RenderTextInput = ({invalid, errorText, style, onChange, value, disabled, isPassword, placeholder, inputFlavor}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  style = {...style, display: 'inline-block'}
  return (
    <input type={isPassword ? 'password' : 'text'} style={ style } title={errorText} className={classNames} onChange={({target}) => onChange(target.value)} value={value ? value : ''} disabled={disabled} placeholder={placeholder} />
  )
}

const RenderStaticText = ({text, errors}) => {
  if (text.trim() == '')
    text = "\u00A0"
  return (
    <span className={ errors ? 'is-invalid' : '' } hint={errors ? errors.join(', ') : errors}>
      {text}
    </span>
  )
}

class TextField extends Field {
  constructor(props) {
    super(props)
    const isInvalid = (this.props.required && !this.props.value)
    this.state = {
      invalid: isInvalid,
      value: this.valueToText(props.value)
    }
    if (props.onValidChange)
      props.onValidChange(!isInvalid)
  }

  inputFlavor() {
    return 'text'
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const isInvalid = this.props.required && !nextProps.value
      const newState = {value: this.valueToText(nextProps.value),
                     invalid: isInvalid}
      this.setState(newState)
      if (this.props.onValidChange)
        this.props.onValidChange(!isInvalid)
    }
  }
  onChange(text) {
    if (this.props.onTransformInput) {
      text = this.props.onTransformInput(text) 
    }
  
    let isInvalid = false
    if (text == '') {
      isInvalid = this.props.required
      this.setState({value: text, invalid: this.props.required})
      if (this.props.onChange)
        this.props.onChange(null)
    }
    else if (this._isValidText(text)) {
      isInvalid = false
      this.setState({value: text, invalid: false})
      if (this.props.onChange)
        this.props.onChange(this.textToValue(text))
    } else {
      isInvalid = true
      this.setState({value: text, invalid: true})
    }
    if (this.props.onValidChange)
      this.props.onValidChange(!isInvalid)
  }
  valueToText(value) {
    if (value == null)
      return ''
    return '' + value
  }
  isValidText(text) {
    if (this.props.regex && !text.match(this.props.regex)) {
      return false 
    }
    if (this.props.maxLength && text.length > this.props.maxLength) {
      return false 
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
    if (typeof(this.props.value) == 'undefined' && this.props.displayPlaceholder)
      text = this.props.displayPlaceholder
    const props = {
      errors: this.props.error,
      text: text,
    }
    const Renderer = this.props.displayRenderer || getRenderer('TextField', 'display', RenderStaticText)
    return <Renderer {...props}/>
  }
  renderEdit(extraProps) {
    const props = {
      invalid: this.props.error || this.state.invalid,
      errorText: this.props.error ? this.props.error.join(', ') : '',
      className: "form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value,
      disabled: this.props.readOnly,
      isPassword: this.props.isPassword,
      placeholder: this.props.placeholder,
      inputFlavor: this.inputFlavor,
      ...extraProps
    }
    const Renderer = this.props.editRenderer || getRenderer('TextField', 'edit', RenderTextInput)
    return <Renderer {...props}/>
  }
}

TextField.defaultProps = {
  required: false,
  readOnly: false,
  regex: null,
  error: null,
  isPassword: false,
  displayPlaceholder: null,
  placeholder: null
}

TextField.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  regex: PropTypes.object,
  error: PropTypes.string,
  onTransformInput: PropTypes.func,
  readOnly: PropTypes.bool,
  isPassword: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  displayPlaceholder: PropTypes.string
}

export {RenderTextInput, TextField}
