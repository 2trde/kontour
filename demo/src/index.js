import React, {Component} from 'react'
import {render} from 'react-dom'
import {Table} from '../../src'
import {Form} from '../../src'
import {IntField, TextField, DateField, SelectField} from '../../src'
import moment from 'moment'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      day: moment(),
      auction: {
        id: 123,
        maker: "Volkswagen",
        model: "Golf",
        mileage: 90000,
        registration_date: '2008-08-01',
        car_type: 'sedan'
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
          <TextField label="Hersteller" attr="maker" />
          <TextField label="Modell" attr="model" />
          <IntField label="Laufleistung" attr="mileage" />
        </Table>
        <Form edit={this.state.edit} value={this.state.auction} onChange={(val) => this.setState({auction: val})}>
          <TextField label="Hersteller" attr="maker" />
          <TextField label="Modell" attr="model" />
          <IntField label="Laufleistung" attr="mileage" />
          <DateField label="Erstzulassung" attr="registration_date" />
          <SelectField label="Aufbauart" attr="car_type" options={['sedan', 'estate', 'convertible']}/>
        </Form>
        <button onClick={ () => this.setState({edit: !this.state.edit}) }>Toggle Edit</button>
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
