import {SelectField} from './SelectField'
import PropTypes from 'prop-types'

class ObjectSelectField extends SelectField {
  getOptions() {
    if (this.props.options) {
      return this.props.options.map((opj) => this.objectToKeyValuePair(opj))
    } else {
      return []
    }
  }

  objectToKeyValuePair(obj) {
    let text = ''
    const key = obj[this.props.keyAttr]
    if (this.props.textAttr) { text = obj[this.props.textAttr] } else if (this.props.textFun) { text = this.props.textFun(obj) } else throw Error('define either textAttr or textFun')
    return {key: key, text: text}
  }
}

ObjectSelectField.propTypes = {
  keyAttr: PropTypes.string.isRequired,
  textAttr: PropTypes.string,
  textFun: PropTypes.func,
  options: PropTypes.array
}

export {ObjectSelectField}
