import React from 'react'
import PropTypes from 'prop-types'
import {Field} from './Field'
import {getRenderer} from './Renderer'

const RenderSelectDisplay = ({text}) => {
  return <span>{text}</span>
}

const RenderSelect = ({invalid, onChange, value, options, disabled}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  const val = typeof (value) === 'undefined' || value === null ? '' : value
  return (
    <select onChange={({target}) => onChange(target.value === '' ? null : target.value)} value={val} className={classNames} disabled={disabled}>
      {options.map((option) => {
        return <option key={option.key} value={option.key} >{ option.text }</option>
      })}
    </select>
  )
}

class SelectField extends Field {
  constructor(props) {
    super(props)
    const isInvalid = this.isInvalid(props)
    this.state = {
      invalid: isInvalid
    }
    if (props.onValidChange)
      props.onValidChange(!isInvalid)
  }

  isInvalid(props) {
    return props.required && props.value == null
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const isInvalid = this.isInvalid(nextProps)
    this.setState({invalid: isInvalid})
    if (this.props.onValidChange)
      this.props.onValidChange(!isInvalid)
  }

  getOptions() {
    if (this.props.options) {
      return this.props.options.map((opt) => {
        if (typeof (opt) === 'string') { return {key: opt, text: opt} } else { return opt }
      })
    } else {
      return []
    }
  }

  getOptionsInclEmpty() {
    if (this.props.forceSelect)
      return this.getOptions()
    else
      return [{key: null, text: this.props.emptyText || ''}].concat(this.getOptions())
  }

  handleOnChange(newValue) {
    if (this.props.onChange) { this.props.onChange(newValue) }
    const isInvalid = this.props.required && !newValue
    this.setState({invalid: isInvalid})
    if (this.props.onValidChange) { this.props.onValidChange(!isInvalid) }
  }

  renderShow() {
    let text = '\u00a0'
    this.getOptionsInclEmpty().forEach((val) => {
      if (typeof (val.key) !== 'undefined' && val.key === this.props.value) { text = val.text }
    })
    if (!text || text === '') text = '\u00a0'
    return React.createElement(getRenderer('SelectField', 'display', RenderSelectDisplay), {text, fieldProps: this.props}, '')
  }

  renderEdit() {
    const props = {
      invalid: this.props.error || this.state.invalid,
      onChange: this.handleOnChange.bind(this),
      value: this.props.value,
      options: this.getOptionsInclEmpty(),
      disabled: this.props.readOnly,
      fieldProps: this.props,
      placeholder: this.props.placeholder
    }

    return React.createElement(getRenderer('SelectField', 'edit', RenderSelect), props, '')
  }
}

RenderSelectDisplay.propTypes = {
  text: PropTypes.string
}

RenderSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array
}

export {SelectField}
