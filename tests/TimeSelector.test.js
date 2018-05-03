import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {TimeSelector} from '../src'
import { shallow, mount } from 'enzyme'
import './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('TimeSelector', () => {
  it('simple hour increase', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:30' onChange={onChange} minDelta={5}/>)
    wrapper.find('.incHour').simulate('click')
    expect(onChange.args[0][0]).toEqual('13:30')
  })
  it('simple hour decrease', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:30' onChange={onChange} minDelta={5}/>)
    wrapper.find('.decHour').simulate('click')
    expect(onChange.args[0][0]).toEqual('11:30')
  })
  it('simple min increase', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:30' onChange={onChange} minDelta={5}/>)
    wrapper.find('.incMin').simulate('click')
    expect(onChange.args[0][0]).toEqual('12:35')
  })
  it('min increase, round minute', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:31' onChange={onChange} minDelta={5}/>)
    wrapper.find('.incMin').simulate('click')
    expect(onChange.args[0][0]).toEqual('12:35')
  })
  it('simple min decrease', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:30' onChange={onChange} minDelta={5}/>)
    wrapper.find('.decMin').simulate('click')
    expect(onChange.args[0][0]).toEqual('12:25')
  })
  it('wrap min on inc', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:55' onChange={onChange} minDelta={5}/>)
    wrapper.find('.incMin').simulate('click')
    expect(onChange.args[0][0]).toEqual('13:00')
  })
  it('wrap min on inc', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TimeSelector value='12:00' onChange={onChange} minDelta={5}/>)
    wrapper.find('.decMin').simulate('click')
    expect(onChange.args[0][0]).toEqual('11:55')
  })
})
