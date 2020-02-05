import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {getRenderer} from './Renderer'

const RenderStatic = ({value, errors}) => {
  let text = ''
  if (value && value) { text = '' + value }
  if (text.trim() == '') { text = '\u00A0' }
  return (
    <span className={errors ? 'is-invalid' : ''} hint={errors ? errors.join(', ') : null}>
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
    if (this.props.edit) { return this.renderEdit() } else { return this.renderShow() }
  }
}

RenderStatic.propTypes = {
  value: PropTypes.any,
  errors: PropTypes.array
}

Field.propTypes = {
  value: PropTypes.any,
  error: PropTypes.array,
  edit: PropTypes.bool
}

export {Field}
