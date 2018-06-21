import React from 'react'
import {TextField} from './TextField'
import {RenderTextInput} from './TextField'
import Calendar from './Calendar'
import {MyModal} from './MyModal'
import moment from 'moment'
import {getRenderer} from './Renderer'

const RenderDateField = ({textFieldRender, value, showCalendar, onShowCalendar, onHideCalendar, onChange}) => {
  const date = moment(value, 'YYYY-MM-DD')
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      { textFieldRender({style: {width: 'auto', flexGrow: 1}}) } 
      <button className="btn btn-primary" style={ {display: 'inline-block'} } onClick={onShowCalendar}>...</button>
      <MyModal width={340} show={showCalendar} onHide={onHideCalendar}>
        <Calendar value={date} onChange={(d) => onChange(d.format('YYYY-MM-DD'))}/>
        <div style={{textAlign: 'right'}}>
          <button onClick={onHideCalendar}>übernehmen</button>
        </div>
      </MyModal>
    </div>
  )
}

class DateField extends TextField {
  valueToText(value) {
    if (typeof(value) == 'string') {
      value = moment(value, "YYYY-MM-DD")
    }
    return (value) ? value.format(this.props.displayPattern) : ''
  }
  isValidText(text) {
    const date = moment(text, this.props.displayPattern, true)
    return date.isValid()
  }
  textToValue(text) {
    return text == '' ? null : moment(text, this.props.displayPattern).format('YYYY-MM-DD')
  }
  onChangeCal(d) {
    const val = d.format('YYYY-MM-DD')
    if (this.props.onChange)
      this.props.onChange(val)
  }
  onShowCalendar(e) {
    this.setState({showCalendar: true})
    e.preventDefault()
  }
  onCalendarClose() {
    this.setState({showCalendar: false})
  }
  renderEdit() {
    const props = {
      textFieldRender: super.renderEdit.bind(this), 
      value: this.props.value, 
      showCalendar: this.state.showCalendar, 
      onShowCalendar: () => this.setState({showCalendar: true}), 
      onHideCalendar: () => this.setState({showCalendar: false}),
      onChange: this.props.onChange.bind(this)
    }
    return React.createElement(getRenderer('DateField', 'edit', RenderDateField ), props, '')
  }
}

DateField.defaultProps = {
  onChange: () => {},
  displayPattern: 'DD.MM.YYYY'
}

export {DateField}
