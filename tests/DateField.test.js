import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {DateField} from '../src/DateField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('DateField', () => {
  it('renders a date in display mode', () => {
    const wrapper = mount(<DateField edit={false} value={'2014-05-11'}/>)
    expect(wrapper.find('span').text()).toBe('11.05.2014')
  });

  it('renders null in display mode', () => {
    const wrapper = mount(<DateField edit={false} value={null}/>)
    expect(wrapper.find('span').text()).toBe("\u00A0")
  });


  it('renders a date field in edit mode', () => {
    const wrapper = mount(<DateField edit={true} value={'2014-05-11'}/>)
    expect(wrapper.find('input').prop('value')).toBe('11.05.2014')
  });

  it('renders null in edit mode', () => {
    const wrapper = mount(<DateField edit={true} value={null}/>)
    expect(wrapper.find('input').prop('value')).toBe('')
  });

  it('valid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<DateField edit={true} value={'11.05.2014'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '12.06.2015' }})
    expect(mockOnChange.calledWith('2015-06-12')).toExist();
  });

  it('invalid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<DateField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '456a' }})
    expect(mockOnChange.notCalled).toExist();
  });

  it('change to null (empty text)', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<DateField edit={true} value={'11.05.2014'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '' }})
    expect(mockOnChange.calledWith(null)).toExist();;
  });
})

