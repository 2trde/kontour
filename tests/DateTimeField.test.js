import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {DateTimeField} from '../src/DateTimeField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import moment from 'moment'
import expect from 'expect'
import sinon from 'sinon'

moment.locale("DE")

describe('DateTimeField', () => {
  it('check moment', () => {
    const ts = moment('12.06.2015 14:30', 'DD.MM.YYYY HH:mm')
    expect(ts.utc().format()).toEqual('2015-06-12T12:30:00Z')
  })


  it('renders a date in display mode', () => {
    const wrapper = mount(<DateTimeField edit={false} value='2014-05-11T13:30:15Z'/>)
    expect(wrapper.find('span').text()).toEqual('11.05.2014 15:30')
  });

  it('renders null in display mode', () => {
    const wrapper = mount(<DateTimeField edit={false} value={null}/>)
    expect(wrapper.find('span').text()).toBe("\u00A0")
  });


  it('renders a date field in edit mode', () => {
    const wrapper = mount(<DateTimeField edit={true} value={'2014-05-11T13:30:15Z'}/>)
    expect(wrapper.find('input').prop('value')).toBe('11.05.2014 15:30')
  });

  it('renders null in edit mode', () => {
    const wrapper = mount(<DateTimeField edit={true} value={null}/>)
    expect(wrapper.find('input').prop('value')).toBe('')
  });

  it('valid change of date', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<DateTimeField edit={true} value={'2015-06-11T12:30:15Z'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '12.06.2015 14:30' }})
    expect(mockOnChange.args[0][0]).toEqual('2015-06-12T12:30:00Z')
  });

  it('invalid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<DateTimeField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '456a' }})
    expect(mockOnChange.notCalled).toExist();
  });

  it('change to null (empty text)', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<DateTimeField edit={true} value={'11.05.2014'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '' }})
    expect(mockOnChange.calledWith(null)).toExist();;
  });
})

