import React, { Component } from 'react';
import {getAttribute, setAttribute} from './ObjectHelper'

const RenderFormElement = ({label, field}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
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
    let childrenWithProps = React.Children.map(this.props.children, function(child) {
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

export {Form};
