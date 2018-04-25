import React from 'react'
import {Field} from './Field'
import PropTypes from 'prop-types'

const RenderMultiSelect = ({invalid, onChange, value, options, disabled}) => {
  const validClass = invalid ? 'is-invalid' : ''
  return (
    <ul>
      {options.map((option) => (
        <li>
          <input type='checkbox' key={option.id}
                 checked={option.selected}
                 onChange={({target: {value}}) => onChange(option, value) }/>
          { option.text }
        </li>
      ))}
    </ul>
  )
}

class MultiSelectField extends Field {
  constructor(props) {
    super(props)
    this.state = {
      invalid: this.props.required && (this.props.value == null || this.props.value.length == 0)
    }
  }

  isOptionSelected(option) {
    if (!this.props.value) return false
    return this.props.value.filter(val => {
      return (val == option)
    }).length > 0
  }

  getOptions() {
    return this.props.options.map((opt, i) => {
      return {
        text: opt,
        selected: this.isOptionSelected(opt), 
        id: i,
        value: opt
      }
    })
  }

  handleOnChange(opt) {
    let newValue = null
    if (opt.selected) {
      newValue = this.props.value.filter(o => o != opt.value)
    } else {
      newValue = [...this.props.value, opt.value]
    }
    this.props.onChange(newValue)
  }

  renderShow() {
    let text = '\u00a0'
    const optionsSelected =
      this.getOptions()
      .filter(opt => opt.selected)
      .map(opt => opt.text)
    return <span>{optionsSelected.join(', ')}</span>
  }

  renderEdit() {
    return <RenderMultiSelect invalid={this.state.invalid}
                         onChange={this.handleOnChange.bind(this)}
                         value={this.props.value}
                         options={this.getOptions() }
                         disable={this.props.readOnly}/>
  }
}

MultiSelectField.propTypes = {
  value: PropTypes.array,
  options: PropTypes.array.isRequired
}

export {MultiSelectField}

