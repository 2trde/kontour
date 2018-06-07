import React, { Component } from 'react';
import {getAttribute, setAttribute} from './ObjectHelper'
import PropTypes from 'prop-types'

let RenderFormElement = ({label, field}) => {
  const cls = field.props.attr ? `field-${field.props.attr.replace('.', '-').replace('_', '-')}` : ''
  return (
    <div className={`form-group ${cls}`}>
      <label className="">{label}</label>
      <div>
        {field}
      </div>
    </div>)
}

let RenderForm = ({children}) => {
  return (
    <form onSubmit={ (e) => { e.preventDefault() } }>
      {children}
    </form>
  )
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
  render() {
    if (!this.props.value) return ''
    const list = React.Children.toArray(this.props.children).filter((f) => f.props && (f.props.visible == null || f.props.visible == true))
                 .filter(child => !child.props.cond || child.props.cond(this.props.value))

    let childrenWithProps = React.Children.map(list, function(child) {
      const error = this.props.errors ? getAttribute(this.props.errors, child.props.attr) : null

      return React.cloneElement(child, {
        value: this.props.value ? getAttribute(this.props.value, child.props.attr) : null,
        onChange: (newValue) => this.changeAttribute(child.props.attr, newValue),
        edit: this.props.edit,
        error: error
      })
    }.bind(this));

    return (
      <RenderForm>
        {React.Children.map(childrenWithProps, (child) => { return this.renderFormElement(child) } ) }
      </RenderForm>
    )
  }
}

Form.propTypes = {
  value: PropTypes.object,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
  errors: PropTypes.object
}

const changeRenderFormElement = (newRenderer) => { RenderFormElement = newRenderer }
const changeRenderForm = (newRenderer) => { RenderForm = newRenderer }

export {Form, RenderFormElement, changeRenderForm, changeRenderFormElement};
