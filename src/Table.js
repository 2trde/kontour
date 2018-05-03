import React, { Component } from 'react'
import {getAttribute, setAttribute} from './ObjectHelper'
import PropTypes from 'prop-types'

const RenderTableHeader = ({children, onHeaderClick}) => {
  const clickHandler = onHeaderClick || (() => {})
  const style = onHeaderClick ? {cursor: 'pointer'} : {}
  return (
    <thead>
      <tr>
        {React.Children.map(children, (child, idx) => <th key={idx} style={style} onClick={() => clickHandler(child.props.attr)}>{child.props.label}</th>)}
      </tr>
    </thead>
  )
}

class Table extends Component {
  changeAttribute(idx, attribute, value) {
    const newList = this.props.value.slice()
    const newValue = setAttribute(newList[idx], attribute, value)
    newList[idx] = newValue
    if (this.props.onChange)
      this.props.onChange(newList)
    else
      throw Error('forgot to implement onChange on your table?')
  }

  changeRow(idx, newRow) {
    const newList = this.props.value.slice()
    newList[idx] = newRow
    if (this.props.onChange)
      this.props.onChange(newList)
    else
      throw Error('forgot to implement onChange on your table?')
  }

  childrenWithProps(row, idx) {
    const errors = this.props.errors
    return React.Children.map(this.visibleChildren(), (child) => {
      const errorObj = errors ? errors[idx] : {}
      const error = getAttribute(errorObj, child.props.attr)
      return React.cloneElement(child, {
        row: row,
        value: getAttribute(row, child.props.attr),
        onChange: (newValue) => this.changeAttribute(idx, child.props.attr, newValue),
        onChangeRow: (newValue) => this.changeRow(idx, newValue),
        edit: this.props.edit || child.props.edit,
        error: error
      })
    })
  }

  visibleChildren() {
    return React.Children.toArray(this.props.children).filter(child => !child.props.cond || child.props.cond())
  }

  renderRow(obj, idx) {
    return React.Children.map(this.childrenWithProps(obj, idx), (child) => {
      const onclick = (child.props.attr) ? (() => this.handleClickRow(obj, idx)) : (() => null)
      const style = this.props.onRowClick ? {cursor: 'pointer'} : {}
      return (
        <td key={idx} onClick={onclick} style={style}>
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

  handleOnMouseEnter(e, row) {
  }

  handleOnMouseLeave(e, row) {
  }

  handleOnMouseMove(e, row) {
  }

  handleHeaderClick(attr) {
    if (this.props.onHeaderClick)
      this.props.onHeaderClick(attr)
  }

  renderRows() {
    if (this.props.value == null)
      return null
    return (
      this.props.value.map((row, idx) => {
        return (
          <tr key={row.id} onMouseEnter={(e) => this.handleOnMouseEnter(e, row)} onMouseLeave={(e) => this.handleOnMouseLeave(e, row)}
                            onMouseMove={(e) => this.handleOnMouseMove(e, row)}>
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
        <this.props.renderTableHeader children={this.visibleChildren()} onHeaderClick={this.props.onHeaderClick}/>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }
}

Table.defaultProps = {
  renderTableHeader: RenderTableHeader 
}

Table.propTypes = {
  renderTableHeader: PropTypes.func,
  value: PropTypes.array,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
  errors: PropTypes.array,
  onRowClick: PropTypes.func
}

export {Table};
