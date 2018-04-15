import React from 'react'
import {TextField} from './TextField'
import PropTypes from 'prop-types'

class FloatField extends TextField {
  isValidText(value) {
    return value.match(/^\d*(,\d*)?$/) 
  }
  textToValue(text) {
    if (text.trim() === '')
      return null
    return parseFloat(text.replace(',', '.'))
  }
  valueToText(value) {
    if (value == null)
      return ''
    return (''+value).replace('.', ',')
  }
}

FloatField.propTypes = {
  value: PropTypes.number,
  required: PropTypes.bool
}

export {FloatField}

