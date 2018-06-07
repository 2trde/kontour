import React from 'react'
import {Field} from './Field'

const RenderSelect = ({invalid, onChange, value, options, disabled}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  const val = typeof(value) == 'undefined' || value === null  ? '' : value
  return (
    <select onChange={onChange} value={val} className={classNames} disabled={disabled}>
      {options.map((option) => {
        return <option key={option.key} value={option.key} >{ option.text }</option>
      })}
    </select>
  )
}

class SelectField extends Field {
  constructor(props) {
    super(props)
    this.state = {
      invalid: this.props.required && !this.props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      invalid: nextProps.required && !nextProps.value
    })
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
    return [{key: null, test: ""}].concat(this.getOptions())
  }

  handleOnChange(e) {
    const newValue = e.target.value == '' ? null : e.target.value
    if (this.props.onChange)
      this.props.onChange(newValue)
    this.setState({invalid: this.props.required && !newValue}) 
  }

  renderShow() {
    let text = '\u00a0'
    this.getOptionsInclEmpty().forEach((val) => {
      if (typeof(val.key) != 'undefined' && val.key == this.props.value)
        text = val.text
    }) 
    if (!text || text == '') text = '\u00a0'
    return <span>{text}</span>
  }

  renderEdit() {
    return <RenderSelect invalid={this.state.invalid}
                         onChange={this.handleOnChange.bind(this)}
                         value={this.props.value}
                         options={this.getOptionsInclEmpty() }
                         disable={this.props.readOnly}/>
  }
}

export {SelectField}
