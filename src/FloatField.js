import React from 'react'
import {TextField} from './TextField'
import PropTypes from 'prop-types'
import {getRenderer} from './Renderer'

class FloatField extends TextField {
  inputFlavor() {
    return 'number'
  }

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

    if (this.props.precision) {
      const f = 10**this.props.precision 
      value = Math.round(value * f) / f
    }

    return (''+value).replace('.', ',')
  }
}

FloatField.propTypes = {
  value: PropTypes.number,
  required: PropTypes.bool
}

export {FloatField}

