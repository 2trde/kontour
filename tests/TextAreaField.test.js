import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {TextAreaField} from '../src/TextAreaField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('TextAreaField', () => {
  it('renders a text in display mode', () => {
    const wrapper = mount(<TextAreaField edit={false} value={"Foo"}/>)
    expect(
      wrapper.containsMatchingElement(
        <span>
          Foo
        </span>
      )
    ).toBeTruthy()
  });

  it('renders a input field in edit mode', () => {
    const wrapper = mount(<TextAreaField edit={true} value={"Foo"}/>)
    expect(
      wrapper.containsMatchingElement(
        <textarea className="form-control" value="Foo"/>
      )
    ).toBeTruthy()
  });

  it('triggers change event if text is changed', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<TextAreaField edit={true} value={'Foo'} onChange={mockOnChange}/>)
    wrapper.find('textarea').simulate('change', { target: { value: 'Bar' }})
    expect(mockOnChange.withArgs('Bar')).toExist();
  });

  it('detects invalid input with regex', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<TextAreaField edit={true} value={'123'} regex={/\d\d\d/} onChange={mockOnChange}/>)
    wrapper.find('textarea').simulate('change', { target: { value: 'Bar' }})
    expect(mockOnChange.notCalled).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <textarea className="form-control is-invalid" value="Bar"/>
      )
    ).toBeTruthy()
  });

  it('empty required field, enter value, it should be valid now', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<TextAreaField edit={true} required={true} value={null} onChange={mockOnChange}/>)
    expect(wrapper.find('textarea').hasClass('is-invalid')).toEqual(true)
    wrapper.setProps({value: 'foo'})
    expect(wrapper.find('textarea').hasClass('is-invalid')).toEqual(false)
  });

  it('find bug', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<TextAreaField edit={true} value={null} onChange={mockOnChange}/>)
    wrapper.setProps({value: 'foo'})
    wrapper.setProps({error: ['bad things happened']})
    expect(wrapper.find('textarea').props().value).toEqual('foo')
  })

})
