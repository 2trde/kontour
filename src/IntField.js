import React from 'react'
import {TextField} from './TextField'

class IntField extends TextField {
  isValidText(value) {
    return value.match(/^\d*$/) 
  }
  textToValue(text) {
    return parseInt(text, 10)
  }
}

export {IntField}
