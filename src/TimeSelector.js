import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const divider = [
  24,
  60
]
const maxVal = [
  24,
  60
]

class TimeSelector extends Component {
  onChangePart(idx, delta) {
    let parts = this.props.value.split(":").map((s) => parseInt(s))

    let newVal = Math.round(parts[idx] / Math.abs(delta)) * Math.abs(delta)
    newVal = (newVal + delta)

    if (newVal >= maxVal[idx]) {
      newVal = newVal % maxVal[idx]
      if (idx == 1) parts[0] = parts[0] + 1
    }
    if (newVal < 0) {
      newVal = newVal + maxVal[idx]
      if (idx == 1) parts[0] = parts[0] - 1
    }
    parts[idx] = newVal
    parts = parts.map(v => v < 10 ? '0' + v : '' + v)
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
          <button className='incHour' style={buttonStyles} onClick={() => this.onChangePart(0, 1)}>+</button>
          <button className='incMin' style={buttonStyles} onClick={() => this.onChangePart(1, this.props.minDelta)}>+</button>
        </div>
        <div style={subContainerStyles}>
          <input style={inputStyles} value={parts[0]} readOnly/>
          <input style={inputStyles} value={parts[1]} readOnly/>
        </div>
        <div style={subContainerStyles}>
          <button className='decHour' style={buttonStyles} onClick={() => this.onChangePart(0, -1)}>-</button>
          <button className='decMin' style={buttonStyles} onClick={() => this.onChangePart(1, -this.props.minDelta)}>-</button>
        </div>
      </div>
    )  
  }
}

TimeSelector.defaultProps = {
  minDelta: 15
}

TimeSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  minDelta: PropTypes.number
}

export {TimeSelector}

