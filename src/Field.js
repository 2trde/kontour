import React, { Component } from 'react'

class Field extends Component {
  renderShow() {
    let text = ''
    if (this.props.value && this.props.value)
      text = ''+this.props.value
    if (text.trim() == '')
      text = "\u00A0"
    return (
      <span>
        {text}
      </span>
    )
  }
  render() {
    if (this.props.edit)
      return this.renderEdit()
    else
      return this.renderShow()
  }
}

export {Field}
