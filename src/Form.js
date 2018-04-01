import React, { Component } from 'react';
import {getAttribute, setAttribute} from './ObjectHelper'

let RenderFormElement = ({label, field}) => {
  return (
    <div className="form-group">
      <label className="">{label}</label>
      <div>
        {field}
      </div>
    </div>)
}

class Form extends Component {
  changeAttribute(attribute, value) {
    const newValue = setAttribute(this.props.value, attribute, value)
    if (this.props.onChange)
      this.props.onChange(newValue)
  }
  renderFormElement(child) {
    return <RenderFormElement field={child} label={child.props.label} />
  }
  render(children) {
    const list = React.Children.toArray(this.props.children).filter((f) => f.props.visible == null || f.props.visible == true)
    let childrenWithProps = React.Children.map(list, function(child) {
      return React.cloneElement(child, {
        value: this.props.value ? getAttribute(this.props.value, child.props.attr) : null,
        onChange: (newValue) =>  this.changeAttribute(child.props.attr, newValue),
        edit: this.props.edit
      })
    }.bind(this));

    return (
      <form>
        {React.Children.map(childrenWithProps, (child) => { return this.renderFormElement(child) } ) }
      </form>
    )
  }
}

export {Form, RenderFormElement};
