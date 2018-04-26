import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Form, TextField} from '../src'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('Form', () => {
  it('form will fill fields even if they aint in the initial data', () => {
    const mockOnChange = sinon.spy();
    const wrapper = mount(
      <Form edit={true} value={{}} onChange={mockOnChange}>
        <TextField attr='myfield' label='foo'/>
      </Form>
    )
    console.log('wrapper', wrapper.debug())
    wrapper.find('input').simulate('change', { target: { value: 'Bar' }})

    expect(mockOnChange.args[0][0]).toEqual({myfield: 'Bar'});
  })
})
