import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const divider = [
  24,
  60
]

export default class TimeSelector extends Component {
  onChangePart(idx, delta) {
    const parts = this.props.value.split(":")
    const part = parseInt(parts[idx])
    const newVal = (part + delta) % divider[idx]
    const newValTxt = newVal < 10 ? '0' + newVal : '' + newVal     
    parts[idx] = newValTxt
    const newValue = parts.join(':')
    if (this.props.onChange)
      this.props.onChange(newValue)
  }

  render() {
    const parts = this.props.value.split(":")

    const inputStyles = {
      width: '100px',
      fontSize: 60,
      color: 'white',
      backgroundColor: 'black',
      flexGrow: 1,
      textAlign: 'center'
    }
    const buttonStyles = {
      width: '100px',
      height: '40px',
      flexGrow: 1,
      fontSize: 20
    }

    const containerStyles = {
      display: 'inline-flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      height: '100%'
    }

    const subContainerStyles = {
      display: 'flex', 
    }

    return (
      <div style={ containerStyles }>
        <div style={subContainerStyles}>
          <button style={buttonStyles} onClick={() => this.onChangePart(0, 1)}>+</button>
          <button style={buttonStyles} onClick={() => this.onChangePart(1, 5)}>+</button>
        </div>
        <div style={subContainerStyles}>
          <input style={inputStyles} value={parts[0]}/>
          <input style={inputStyles} value={parts[1]}/>
        </div>
        <div style={subContainerStyles}>
          <button style={buttonStyles} onClick={() => this.onChangePart(0, -1)}>-</button>
          <button style={buttonStyles} onClick={() => this.onChangePart(1, -5)}>-</button>
        </div>
      </div>
    )  
  }
}

TimeSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
