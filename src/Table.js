import React, { Component } from 'react'
import {getAttribute, setAttribute} from './ObjectHelper'

class Table extends Component {
  changeAttribute(idx, attribute, value) {
    const newList = this.props.value.slice()
    const newValue = setAttribute(newList[idx], attribute, value)
    newList[idx] = newValue
    if (this.props.onChange)
      this.props.onChange(newList)
  }

  childrenWithProps(row, idx) {
    return React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        row: row,
        value: getAttribute(row, child.props.attr),
        onChange: (newValue) => this.changeAttribute(idx, child.props.attr, newValue),
        edit: this.props.edit
      })
    }.bind(this))
  }

  renderHeader() {
    let header = React.Children.map(this.props.children, function(child, idx) {
      return <th key={idx}>{child.props.label}</th>
    })
    return (
      <tr>
        {header}
      </tr>
    )
  }

  renderRow(obj, idx) {
    return React.Children.map(this.childrenWithProps(obj, idx), (child) => {
      return (
        <td key={idx}>
          {child}
        </td>
      )
    })
  }

  renderRows() {
    if (this.props.value == null)
      return null
    return (
      this.props.value.map(function(row, idx) {
        return (
          <tr key={row.id}>
            {this.renderRow(row, idx)}
          </tr>
        )
      }.bind(this))
    )
  }

  render(children) {
    let rows = this.renderRows()
    return (
      <table className="table">
        <thead>
          { this.renderHeader() }
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }
}

export {Table};
