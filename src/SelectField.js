import React from 'react'
import {Field} from './Field'

const RenderSelect = ({onChange, value, options}) => {
  return (
    <select onChange={onChange} value={value || ''} className='form-control'>
      {options.map((option) => {
        return <option key={option.key} value={option.key}>{ option.text }</option>
      })}
    </select>
  )
}

class SelectField extends Field {
  constructor(props) {
    super(props)
  }

  onChange(e) {
    if (this.props.onChange)
      this.props.onChange(this.textToValue(text))
  }

  getOptions() {
    if (this.props.options) {
      return this.props.options.map((opt) => { return {key: opt, text: opt} })
    } else {
      return []
    }
  }

  getOptionsInclEmpty() {
    if (this.props.required) {
      return this.getOptions()
    } else {
      return [{key: null, test: ""}].concat(this.getOptions())
    }
  }

  handleOnChange(e) {
    const newValue = e.target.value == '' ? null : e.target.value
    
    console.log("select changed", newValue)
    if (this.props.onChange)
      this.props.onChange(newValue)
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
    return <RenderSelect onChange={this.handleOnChange.bind(this)} value={this.props.value} options={this.getOptionsInclEmpty() } />
  }
}

export {SelectField}
