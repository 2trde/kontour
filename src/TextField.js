import React from 'react'
import {Field} from './Field'

const RenderTextInput = (props) => {
  return (
    <input type="text" style={ {display: 'inline-block'} } className={props.className} onChange={props.onChange} value={props.value ? props.value : ''}/>
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
