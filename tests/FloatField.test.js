import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {FloatField} from '../src/FloatField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('FloatField', () => {
  it('renders a number in display mode', () => {
    const wrapper = mount(<FloatField edit={false} value={12.3}/>)
    expect(wrapper.find('span').text()).toBe('12,3')
  });

  it('renders a number in display mode with precision', () => {
    const wrapper = mount(<FloatField edit={false} value={12.3456} precision={2}/>)
    expect(wrapper.find('span').text()).toBe('12,35')
  });

  it('renders null in display mode', () => {
    const wrapper = mount(<FloatField edit={false} value={null}/>)
    expect(wrapper.find('span').text()).toBe(' ')
  });

  it('renders a input field in edit mode', () => {
    const wrapper = mount(<FloatField edit={true} value={123}/>)
    expect(wrapper.find('input').prop('value')).toBe('123')
  });

  it('renders null in edit mode', () => {
    const wrapper = mount(<FloatField edit={true} value={null}/>)
    expect(wrapper.find('input').prop('value')).toBe('')
  });

  it('valid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<FloatField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '456' }})
    expect(wrapper.find('input').prop('className')).toBe('form-control')
    expect(mockOnChange.withArgs(456));
  });

  it('invalid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<FloatField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '456a' }})
    expect(wrapper.find('input').prop('className')).toBe('form-control is-invalid')
    expect(mockOnChange.notCalled).toExist();
  });

  it('change to null', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<FloatField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '' }})
    expect(mockOnChange.withArgs(null)).toExist();
  });
  it('change 100 to 00', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<FloatField edit={true} value={'100'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '00' }})
    expect(mockOnChange.withArgs(0)).toExist();
    wrapper.setProps({value: 0})
    expect(wrapper.find('input').prop('className')).toBe('form-control')
    expect(wrapper.find('input').prop('value')).toBe('0')
  });
})
