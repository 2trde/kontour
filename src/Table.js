import React, { Component } from 'react'
import {getAttribute, setAttribute} from './ObjectHelper'

const RenderTableHeader = ({children}) => {
  return (
    <tbody>
      <tr>
        {React.Children.map(children, (child, idx) => <th key={idx}>{child.props.label}</th>)}
      </tr>
    </tbody>
  )
}

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
        edit: this.props.edit || child.props.edit
      })
    }.bind(this))
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

  handleClickRow(row, idx) {
    if (this.props.onRowClick) {
      this.props.onRowClick(row, idx)
    }
  }

  renderRows() {
    if (this.props.value == null)
      return null
    return (
      this.props.value.map((row, idx) => {
        return (
          <tr key={row.id} onClick={() => this.handleClickRow(row, idx) }>
            {this.renderRow(row, idx)}
          </tr>
        )
      })
    )
  }

  render(children) {
    let rows = this.renderRows()
    return (
      <table className="table">
        <RenderTableHeader children={this.props.children}/>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }
}

export {Table};
