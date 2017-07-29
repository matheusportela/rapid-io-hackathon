import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Table } from 'semantic-ui-react'

class Flight extends React.Component {
  getFlightClass(flight) {
    var className = 'ok'
    if (flight.status.localeCompare('warning') === 0)
      className = 'warning'
    else if (flight.status.localeCompare('critical') === 0)
      className = 'error'
    return className;
  }

  render() {
    return (
      <Table.Row className={this.getFlightClass(this.props.flight)}>
        <Table.Cell>{this.props.flight.number}</Table.Cell>
        <Table.Cell>{this.props.flight.origin}</Table.Cell>
        <Table.Cell>{this.props.flight.destination}</Table.Cell>
        <Table.Cell>{this.props.flight.numLuggages}</Table.Cell>
      </Table.Row>
    );
  }
}

class DeparturesList extends React.Component {
  constructor() {
    super();
    this.flights = [
      {
        number: 'AA1632',
        origin: 'SFO',
        destination: 'HOU',
        numLuggages: 7,
        status: 'ok'
      }, {
        number: 'UD4123',
        origin: 'SFO',
        destination: 'JFK',
        numLuggages: 3,
        status: 'ok'
      }, {
        number: 'DT1231',
        origin: 'ATL',
        destination: 'LAX',
        numLuggages: 12,
        status: 'critical'
      }, {
        number: 'AA9234',
        origin: 'MIA',
        destination: 'SFO',
        numLuggages: 9,
        status: 'warning'
      }
    ];
  }

  render() {
    return (
      <div className='departures-list'>
        <Header as='h2'>Departures</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Number</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell># Luggages</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.flights.map((flight) => {
              return <Flight key={flight.number} flight={flight} />;
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

function RapidAirport(props) {
  return (
    <Container class='main' style={{ marginTop: '3em' }}>
      <Header as='h1'>San Francisco International Airport (SFO)</Header>
      <DeparturesList />
    </Container>
  )
}

ReactDOM.render(
  <RapidAirport />,
  document.getElementById('root')
);
