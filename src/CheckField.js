import React from 'react'
import {Field} from './Field'
import {getRenderer} from './Renderer'

class CheckField extends Field {
  onChange() {
    this.props.onChange(!this.props.value)
  }

  renderShow(extraProps) {
    const props = {
      onChange: this.onChange.bind(this),
      value: this.props.value,
      ...extraProps
    }
    const Renderer = getRenderer('CheckField', 'show')
    return <Renderer {...props} />
  }

  renderEdit(extraProps) {
    const props = {
      onChange: this.onChange.bind(this),
      value: this.props.value,
      ...extraProps
    }
    const Renderer = getRenderer('CheckField', 'edit')
    return <Renderer {...props} />
  }
}

export {CheckField}
