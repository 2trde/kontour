import React from 'react'
import {Field} from './Field'
import PropTypes from 'prop-types'

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
    const keyFun = this.props.keyFun
    let newValue = null
    let curValue = this.props.value == null ? [] : this.props.value
    if (opt.selected) {
      newValue = curValue.filter(o => keyFun(o) != keyFun(opt.value))
    } else {
      newValue = [...curValue, opt.value]
    }
    this.props.onChange(newValue)
  }

  renderShow() {
    if (!this.props.options) return ''
    const props = {
      invalid: this.state.invalid
      onChange: this.handleOnChange.bind(this)
      value: this.props.value
      options: this.getOptions() 
      disable: this.props.readOnly
    }
    const Renderer = getRenderer('MultiSelectField', 'display')
    return <Renderer {...props}/>
  }

  renderEdit() {
    if (!this.props.options) return ''
    const props = {
      invalid: this.state.invalid
      onChange: this.handleOnChange.bind(this)
      value: this.props.value
      options: this.getOptions() 
      disable: this.props.readOnly
    }

    const Renderer = getRenderer('MultiSelectField', 'edit')
    return <Renderer {...props}/>
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

