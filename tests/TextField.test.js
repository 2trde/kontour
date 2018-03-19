import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {TextField} from '../src/TextField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('TextField', () => {
  it('renders a text in display mode', () => {
    const wrapper = mount(<TextField edit={false} value={"Foo"}/>)
    expect(
      wrapper.containsMatchingElement(
        <div>
          Foo
        </div>
      )
    ).toBeTruthy()
  });

  it('renders a input field in edit mode', () => {
    const wrapper = mount(<TextField edit={true} value={"Foo"}/>)
    expect(
      wrapper.containsMatchingElement(
        <input className="form-control" value="Foo"/>
      )
    ).toBeTruthy()
  });

  it('triggers change event if text is changed', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(<TextField edit={true} value={'Foo'} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { value: 'Bar' }})
    expect(mockOnChange.withArgs('Bar'));
  });
})
