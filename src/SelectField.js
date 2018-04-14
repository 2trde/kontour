import React from 'react'
import {Field} from './Field'

const RenderSelect = ({invalid, onChange, value, options}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  return (
    <select onChange={onChange} value={value || ''} className={classNames}>
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
      if (val.key && val.key == this.props.value)
        text = val.text
    }) 
    return <span>{text}</span>
  }

  renderEdit() {
    return <RenderSelect invalid={this.state.invalid} onChange={this.handleOnChange.bind(this)} value={this.props.value} options={this.getOptionsInclEmpty() } />
  }
}

export {SelectField}
