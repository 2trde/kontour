import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {SelectField} from '../src/SelectField'
import { shallow, mount } from 'enzyme'
import {} from './TestSetup'
import expect from 'expect'
import sinon from 'sinon'

describe('SelectField', () => {
  it('properly handle false as key in options', () => {
    const wrapper = mount(<SelectField edit={false} value={false} options={[{key: false, text: 'nein'}, {key: true, text: 'nein'}]}/>)
    expect(wrapper.find('span').text()).toBe('nein')
  });
  it('display null value with nbsp', () => {
    const wrapper = mount(<SelectField edit={false} value={null} options={[{key: '0', text: 'nein'}, {key: true, text: 'nein'}]}/>)
    expect(wrapper.find('span').text()).toBe('\u00a0')
  });


  it('accept key to be false', () => {
    const options = [{key: false, text: 'no'}, {key: true, text: 'yes'}]
    const wrapper = mount(<SelectField edit={true} value={false} options={options}/>)
    expect(wrapper.find('select').props().value).toBe(false)
  });
  it('accept key to be true', () => {
    const options = [{key: false, text: 'no'}, {key: true, text: 'yes'}]
    const wrapper = mount(<SelectField edit={true} value={true} options={options}/>)
    expect(wrapper.find('select').props().value).toBe(true)
  });

})
