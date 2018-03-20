import React, { Component } from 'react';

class Table extends Component {
  changeAttribute(idx, attribute, value) {
    let newList = this.props.value.slice()
    let newValue = newList[idx]
    newValue[attribute] = value
    if (this.props.onChange)
      this.props.onChange(newList)
  }

  childrenWithProps(row, idx) {
    return React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        row: row,
        value: this.getAttribute(row, child.props.attr),
        onChange: (newValue) => this.changeAttribute(idx, child.props.attr, newValue),
        edit: this.props.edit
      })
    }.bind(this))
  }

  getAttribute(obj, attrStr) {
    const attrList = attrStr.split('.')
    return this.getAttributeRec(obj, attrList)
  }

  getAttributeRec(obj, attrList) {
    if (attrList.length > 1) {
      const newList = attrList.slice(1)
      return this.getAttributeRec(obj[attrList[0]], newList)
    }
    else
    {
      const val = obj[attrList[0]]
      return val 
    }
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
