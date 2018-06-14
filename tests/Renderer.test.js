import React from 'react'
import {getRenderer, setRenderer} from '../src/Renderer'
import {TextField} from '../src/TextField'
import {} from './TestSetup'
import {mount} from 'enzyme'
import expect from 'expect'

const TestRenderer = ({}) => <span>Foo Bar</span>

it('will store a renderer', () => {
  setRenderer('TextField', 'display', TestRenderer)
  console.log('result of getRenderer: ', getRenderer('TextField', 'display'))
  const wrapper = mount(<TextField value="peng"/>)
  expect(wrapper.text()).toEqual('Foo Bar')
})
