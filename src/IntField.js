import {TextField} from './TextField'
import PropTypes from 'prop-types'

class IntField extends TextField {
  inputFlavor() {
    return 'number'
  }

  isValidText(value) {
    return value.match(/^\d*$/)
  }
  textToValue(text) {
    return parseInt(text, 10)
  }
}

IntField.propTypes = {
  value: PropTypes.number,
  required: PropTypes.bool
}

export {IntField}
