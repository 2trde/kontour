import React, { Component } from 'react'
import {} from './TestSetup'
import moment from 'moment'
import expect from 'expect'
import sinon from 'sinon'

moment.locale("DE")

describe('DateTimeField', () => {
  it('check moment', () => {
    const ts = moment('12.06.2015 14:30', 'DD.MM.YYYY HH:mm')
    expect(ts.utc().format()).toEqual('2015-06-12T12:30:00Z')
  })
})

