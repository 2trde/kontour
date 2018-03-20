import React, { Component } from 'react'

class Field extends Component {
  renderShow() {
    return (
      <span>
        {this.props.value}
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
