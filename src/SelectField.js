import React from 'react'
import {Field} from './Field'
import {getRenderer} from './Renderer'

const RenderSelectDisplay = ({text}) => {
  return <span>{text}</span>
}

const RenderSelect = ({invalid, onChange, value, options, disabled}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  const val = typeof(value) == 'undefined' || value === null  ? '' : value
  return (
    <select onChange={({target}) => onChange(target.value == '' ? null : target.value)} value={val} className={classNames} disabled={disabled}>
      {options.map((option) => {
        return <option key={option.key} value={option.key} >{ option.text }</option>
      })}
    </select>
  )
}

class SelectField extends Field {
  constructor(props) {
    super(props)
    const isInvalid = this.props.required && !this.props.value
    this.state = {
      invalid: isInvalid
    }
    if (props.onValidChange)
      props.onValidChange(!isInvalid)
  }

  componentWillReceiveProps(nextProps) {
    const isInvalid = nextProps.required && !nextProps.value
    this.setState({
      invalid: nextProps.required && !nextProps.value
    })
    if (this.props.onValidChange)
      this.props.onValidChange(!isInvalid)
  }
  getOptions() {
    if (this.props.options) {
      return this.props.options.map((opt) => {
        if (typeof(opt) == 'string')
          return {key: opt, text: opt}
        else
          return opt
      })
    } else {
      return []
    }
  }

  getOptionsInclEmpty() {
    return [{key: null, text: ""}].concat(this.getOptions())
  }

  handleOnChange(newValue) {
    if (this.props.onChange)
      this.props.onChange(newValue)
    const isInvalid = this.props.required && !newValue
    this.setState({invalid: isInvalid}) 
    if (this.props.onValidChange)
      this.props.onValidChange(!isInvalid)
  }

  renderShow() {
    let text = '\u00a0'
    this.getOptionsInclEmpty().forEach((val) => {
      if (typeof(val.key) != 'undefined' && val.key == this.props.value)
        text = val.text
    }) 
    if (!text || text == '') text = '\u00a0'
    return React.createElement(getRenderer('SelectField', 'display', RenderSelectDisplay), {text}, '')
  }

  renderEdit() {
    const props = {
      invalid: this.state.invalid,
      onChange: this.handleOnChange.bind(this),
      value: this.props.value,
      options: this.getOptionsInclEmpty(),
      disable: this.props.readOnly
    }

    return React.createElement(getRenderer('SelectField', 'edit', RenderSelect), props, '')
  }
}

export {SelectField}
