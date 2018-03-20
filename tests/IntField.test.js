import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {IntField} from '../src/IntField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('IntField', () => {
  it('renders a number in display mode', () => {
    const wrapper = mount(<IntField edit={false} value={123}/>)
    expect(wrapper.find('span').text()).toBe('123')
  });

  it('renders null in display mode', () => {
    const wrapper = mount(<IntField edit={false} value={null}/>)
    expect(wrapper.find('span').text()).toBe('')
  });

  it('renders a input field in edit mode', () => {
    const wrapper = mount(<IntField edit={true} value={123}/>)
    expect(wrapper.find('input').prop('value')).toBe(123)
  });

  it('renders null in edit mode', () => {
    const wrapper = mount(<IntField edit={true} value={null}/>)
    expect(wrapper.find('input').prop('value')).toBe('')
  });

  it('valid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<IntField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '456' }})
    expect(mockOnChange.withArgs(456));
  });

  it('invalid change', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<IntField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '456a' }})
    expect(mockOnChange.notCalled);
  });

  it('change to null', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<IntField edit={true} value={'123'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: '' }})
    expect(mockOnChange.withArgs(null));
  });
})
