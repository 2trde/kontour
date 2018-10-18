import React from 'react'
import {Field} from './Field'

const RenderCheckboxInput = ({style, onChange, value}) => {
  const classNames = ''
  style = {...style, display: 'inline-block'}
  return (
    <input type="checkbox" style={ style } className={classNames} onChange={onChange} checked={value ? value : ''}/>
  )
}

class CheckField extends Field {
  onChange(e) {
    this.props.onChange(!this.props.value)
  }
  renderShow() {
    const props = {
      onChange: this.onChange.bind(this),
      value: this.props.value,
      ...extraProps
    }
    const Renderer = getRenderer('CheckField', 'show')
    return <Renderer {...props}/>
  }
  renderEdit(extraProps) {
    const props = {
      onChange: this.onChange.bind(this),
      value: this.props.value,
      ...extraProps
    }
    const Renderer = getRenderer('CheckField', 'edit')
    return <Renderer {...props}/>
  }
}

export {CheckField}
