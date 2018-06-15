import React, { Component } from 'react';
import {getAttribute, setAttribute} from './ObjectHelper'
import PropTypes from 'prop-types'
import {getRenderer} from './Renderer'

const RenderFormElement = ({label, field}) => {
  const cls = field.props.attr ? `field-${field.props.attr.replace('.', '-').replace('_', '-')}` : ''
  return (
    <div className={`form-group ${cls}`}>
      <label className="">{label}</label>
      <div>
        {field}
      </div>
    </div>)
}

const RenderForm = ({children}) => {
  return (
    <form onSubmit={ (e) => { e.preventDefault() } }>
      {children}
    </form>
  )
}

class Form extends Component {
  constructor(props)  {
    super(props)
    this.fieldValidStatus = {}
  }
  changeAttribute(attribute, value) {
    const newValue = setAttribute(this.props.value, attribute, value)
    if (this.props.onChange)
      this.props.onChange(newValue)
  }
  renderFormElement(child) {
    const props = {
      field: child,
      label: child.props.label
    }
    const Renderer = this.props.formElementRenderer || getRenderer('Form', 'element', RenderFormElement)
    return <Renderer {...props}/>
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
        onValidChange: (valid) => this.updateValidStatus(child.props.attr, valid),
        edit: this.props.edit,
        error: error
      })
    }.bind(this));

    const children = React.Children.map(childrenWithProps, (child) => { return this.renderFormElement(child) } ) 
    const Renderer = this.props.formRenderer || getRenderer('Form', 'form', RenderForm)
    return <Renderer>{children}</Renderer>
  }

  updateValidStatus(attr, valid) {
    if (this.fieldValidStatus[attr] !== valid) {
      const validStatus = {...this.fieldValidStatus}
      validStatus[attr] = valid
      const allValid = Object.entries(validStatus).filter(([k, v]) => v == false).length == 0
      if (this.props.onValidChange && this.fieldValidStatus !== validStatus)
        this.props.onValidChange(allValid)
      this.fieldValidStatus = validStatus
    }
  }
}

Form.propTypes = {
  value: PropTypes.object,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
  errors: PropTypes.object
}

export {Form, RenderFormElement};
