import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Table, TextField} from '../src/'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('Table', () => {
  it('render a table with a text field', () => {
    const list = [
      {foo: "bar"}
    ]
    const wrapper = mount(<Table edit={false} value={list}><TextField attr="foo"/></Table>)
    expect(wrapper.find('table tbody tr td').text()).toBe('bar')
  });

  it('render a table with a text field in a sub-object', () => {
    const list = [
      {foo: {foo2: "bar"}}
    ]
    const wrapper = mount(<Table edit={false} value={list}><TextField attr="foo.foo2"/></Table>)
    expect(wrapper.find('table tbody tr td').text()).toBe('bar')
  });
})
