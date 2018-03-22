import React from 'react'
import {Field} from './Field'

const RenderTextInput = ({invalid, onChange, value}) => {
  const validClass = invalid ? 'is-invalid' : ''
  const classNames = ('form-control ' + validClass).trim()
  return (
    <input type="text" style={ {display: 'inline-block'} } className={classNames} onChange={onChange} value={value ? value : ''}/>
  )
}

class TextField extends Field {
  onChange(e) {
    if (this.props.onChange)
      this.props.onChange(e.target.value)
  }
  renderEdit() {
    const props = {
      className: "form-control",
      onChange: this.onChange.bind(this),
      value: this.props.value
    }
    return <RenderTextInput {...props}/>
  }
}

export {RenderTextInput, TextField}
