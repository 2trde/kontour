import React from 'react'
import {Field} from './Field'

const RenderCheckboxInput = ({style, onChange, value}) => {
  const classNames = ''
  style = {...style, display: 'inline-block'}
  return (
    <input type="checkbox" style={ style } className={classNames} onChange={onChange} value={value ? value : ''}/>
  )
}

class CheckField extends Field {
  onChange(e) {
  }
  renderShow() {
    let text = this.props.value ? 'yes' : 'no'
    return (
      <span>
        {text}
      </span>
    )
  }
  renderEdit(extraProps) {
    const props = {
      className: "form-control",
      onChange: this.onChange.bind(this),
      value: this.props.value,
      ...extraProps
    }
    return <RenderCheckboxInput {...props}/>
  }
}

export {CheckField}
