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
  it('it should not crash with obj if value is null', () => {
    const mockOnChange = sinon.spy();
    const options = [{id: 1, name: 'foo'}]
    const selected = null
    const wrapper = mount(<MultiSelectField edit={true} value={selected} options={options}
                                            keyFun={(o) => o.id} textFun={(o) => o.name} onChange={mockOnChange}/>)
    wrapper.find('input').simulate('change', { target: { }})
    expect(mockOnChange.args[0][0]).toEqual([{"id": 1, "name": "foo"}])
  });
})
