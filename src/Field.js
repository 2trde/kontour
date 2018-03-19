import React, { Component } from 'react'

class Field extends Component {
  renderShow() {
    return (
      <div>
        {this.props.value}
      </div>
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
