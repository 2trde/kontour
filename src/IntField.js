import React from 'react'
import {Field} from './Field'
import {RenderTextInput} from './TextField'

class IntField extends Field {
  constructor(props) {
    super(props)
    this.state = { value: props.value, cls: "valid" }
  }
  onChange(e) {
    const newText = e.target.value
    if (newText.trim() === '') {
      this.setState({value: newText, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(null)
    }
    else if (newText.match(/^ *\d* *$/)) {
      this.setState({value: newText, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(parseInt(e.target.value, 10))
    }
    else
    {
      this.setState({value: newText, cls: "is-invalid "})
    }
  }
  renderEdit() {
    const props = {
      className: this.state.cls + " form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value
    }
    return <RenderTextInput {...props}/>
  }
}

export {IntField}
