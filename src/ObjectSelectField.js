import React from 'react'
import {SelectField} from './SelectField'

class ObjectSelectField extends SelectField {
  getOptions() {
    if (this.props.options) {
      return this.props.options.map((opt) => this.objectToKeyValuePair(obt))
    } else {
      return []
    }
  }

  objectToKeyValuPair(obj) {
    let text = ''
    const key = obj[this.props.keyAttr]
    if (this.props.valueAttr)
      text = obj[this.props.textAttr]
    else if (this.props.valueFun)
      text = this.props.textFun(obj)
    else throw Error("define either textAttr or textFun")
    return {key: text, text: text}
  }
}

export {ObjectSelectField}

