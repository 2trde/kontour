import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {MultiSelectField} from '../src/MultiSelectField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'
import renderer from 'react-test-renderer';

describe('MultiSelectField', () => {
  it('renders selected options in display mode', () => {
    const options = ['foo', 'bar', 'poo']
    const selected = ['foo', 'bar']
    const wrapper = mount(<MultiSelectField edit={false} value={selected} options={options}/>)
    expect(wrapper.find('span').text()).toEqual('foo, bar')
  });

  it('renders selected options in edit mode', () => {
    const options = ['foo', 'bar', 'poo']
    const selected = ['foo', 'bar']
    const wrapper = mount(<MultiSelectField edit={true} value={selected} options={options}/>)
    //expect(wrapper.debug()).toEqual('');
    // how to test the input-fields
  });
})
