import React, {Component} from 'react'
import {render} from 'react-dom'
import {Table} from '../../src'
import {Form} from '../../src'
import {CheckField, IntField, TextField, TextAreaField, MultiSelectField, DateTimeField, DateField, SelectField} from '../../src'
import moment from 'moment'
import './index.css'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: null,
      edit: true,
      day: moment(),
      auction: {
        id: 123,
        maker: null,
        model: "Golf",
        mileage: 90000,
        registration_date: '2008-08-01',
        //end_ts: '2008-08-01T13:27:00',
        end_ts: null,
        car_type: null,
        selected: false,
        multiSelect: ['foo'],
        description: 'foo bar'
      },
      list: [
        {
          id: 1,
          maker: "Volkswagen",
          model: "Golf",
          mileage: 90000
        },
        {
          id: 2,
          maker: "BMW",
          model: "335",
          mileage: 61000 
        },
        {
          id: 3,
          maker: "Audi",
          model: "A5",
          mileage: 30000
        },
      ]
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Form example</h1>
        <Table edit={this.state.edit} value={this.state.list} onChange={(val) => this.setState({list: val})}>
          <TextField label="Hersteller" attr="maker"/>
          <TextField label="Modell" attr="model" />
          <IntField label="Laufleistung" attr="mileage" />
        </Table>
        <Form edit={this.state.edit} value={this.state.auction}
              onChange={(val) => this.setState({auction: val})}
              onValidChange={(formValid) => this.setState({formValid})}>
          <TextField label="Hersteller" attr="maker"  required={true} />
          <TextField label="Modell" attr="model" />
          <IntField label="Laufleistung" attr="mileage" />
          <DateField label="Erstzulassung" attr="registration_date" />
          <DateTimeField label="Ende" attr="end_ts" />
          <SelectField required={true} label="Aufbauart" attr="car_type" options={['sedan', 'estate', 'convertible']}/>
          <CheckField label="Auswaehlen" attr="selected"/>
          <MultiSelectField attr='multiSelect' label='MultiSelect' options={['foo', 'bar', 'bla']}/>
          <TextAreaField label="Description" attr="description" />
        </Form>
        <div>Form is valid: {this.state.formValid ? 'valid' : 'invalid'} </div> 
        <button onClick={ () => this.setState({edit: !this.state.edit}) }>Toggle Edit</button>
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
