import React, { Component } from 'react'

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
    return (
      <RenderStatic value={this.props.value} errors={this.prop.error}/>
    )
  }
  render() {
    if (this.props.edit)
      return this.renderEdit()
    else
      return this.renderShow()
  }
}

const changeRenderStatic = (newRenderer) => { RenderStatic = newRenderer }

export {Field, changeRenderStatic}
