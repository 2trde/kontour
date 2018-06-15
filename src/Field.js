import React, { Component } from 'react'
import {getRenderer} from './Renderer'

let RenderStatic = ({value, errors}) => {
  let text = ''
  if (value && value)
    text = ''+value
  if (text.trim() == '')
    text = "\u00A0"
  return (
    <span className={ error ? 'is-invalid' : '' } hint={error ? errors.join(', ') : null}>
      {text}
    </span>
  )
}

class Field extends Component {
  renderShow() {
    const props = {
      value: this.props.value,
      errors: this.props.error
    }
    return React.createElement(getRenderer('Field', 'display', RenderStatic), props, '')
  }
  render() {
    if (this.props.edit)
      return this.renderEdit()
    else
      return this.renderShow()
  }
}


export {Field}
