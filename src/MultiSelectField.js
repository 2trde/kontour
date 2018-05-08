import React from 'react'
import {Field} from './Field'
import PropTypes from 'prop-types'

const RenderMultiSelect = ({invalid, onChange, value, options, disabled}) => {
  const validClass = invalid ? 'is-invalid' : ''
  return (
    <ul style={{listStyleType: 'none', WebkitPaddingStart: 0}}>
      {options.map((option) => (
        <li key={option.id}>
          <input type='checkbox' key={option.id}
                 checked={option.selected}
                 onChange={() => onChange(option) }/>
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
      invalid: this.props.required && (this.props.value == null || this.props.value.length === 0)
    }
  }

  isOptionSelected(option) {
    if (!this.props.value) return false
    return this.props.value.filter(val => {
      return (this.props.keyFun(val) === this.props.keyFun(option))
    }).length > 0
  }

  getOptions() {
    return this.props.options.map((opt, i) => {
      return {
        text: this.props.textFun(opt),
        selected: this.isOptionSelected(opt), 
        id: this.props.keyFun(opt),
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
    if (!this.props.options) return ''
    const optionsSelected =
      this.getOptions()
      .filter(opt => opt.selected)
      .map(opt => opt.text)
    return <span>{optionsSelected.join(', ')}</span>
  }

  renderEdit() {
    if (!this.props.options) return ''
    return <this.props.renderer invalid={this.state.invalid}
                         onChange={this.handleOnChange.bind(this)}
                         value={this.props.value}
                         options={this.getOptions() }
                         disable={this.props.readOnly}/>
  }
}

MultiSelectField.defaultProps = {
  renderer: RenderMultiSelect,
  keyFun: (val) => val,
  textFun: (val) => val
}

MultiSelectField.propTypes = {
  renderer: PropTypes.func,
  value: PropTypes.array,
  options: PropTypes.array.isRequired,
  textFun: PropTypes.func,
  keyFun: PropTypes.func
}

export {MultiSelectField}

