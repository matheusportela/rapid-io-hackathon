import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Grid, Icon, Menu, Table } from 'semantic-ui-react'
import MediaQuery from 'react-responsive';
import FontAwesome from 'react-fontawesome';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

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
      <tr className={this.getFlightClass(this.props.flight)}>
        <td>{this.props.flight.gate}</td>
        <td>{this.props.flight.itemsDeparting}</td>
        <td>{this.props.flight.destination}</td>
        <td>{this.props.flight.flightNumber}</td>
      </tr>
    );
  }
}

class DeparturesList extends React.Component {
  constructor() {
    super();
    this.flights = [
      {
        gate: 'A45',
        itemsDeparting: 131,
        destination: 'JFK',
        flightNumber: 'N141XR',
        status: 'ok'
      }, {
        gate: 'B34',
        itemsDeparting: 120,
        destination: 'LAX',
        flightNumber: 'A418FT',
        status: 'ok'
      }, {
        gate: 'C23',
        itemsDeparting: 150,
        destination: 'OAK',
        flightNumber: 'SW345DR',
        status: 'critical'
      }, {
        gate: 'D7',
        itemsDeparting: 89,
        destination: 'SJC',
        flightNumber: 'PF3043L',
        status: 'warning'
      }
    ];
  }

  render() {
    return (
      <div className='card'>
        <span className='card-title'>Departing Flights</span>
        <table>
          <thead>
            <tr>
              <th>Gate number</th>
              <th>Items departing</th>
              <th>Destination</th>
              <th>Flight number</th>
            </tr>
          </thead>
          <tbody>
            {this.flights.map((flight) => {
              return <Flight key={flight.number} flight={flight} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class ArrivalsList extends React.Component {
  constructor() {
    super();
    this.flights = [
      {
        gate: 'A45',
        itemsDeparting: 131,
        destination: 'JFK',
        flightNumber: 'N141XR',
        status: 'ok'
      }, {
        gate: 'B34',
        itemsDeparting: 120,
        destination: 'LAX',
        flightNumber: 'A418FT',
        status: 'ok'
      }, {
        gate: 'C23',
        itemsDeparting: 150,
        destination: 'OAK',
        flightNumber: 'SW345DR',
        status: 'critical'
      }, {
        gate: 'D7',
        itemsDeparting: 89,
        destination: 'SJC',
        flightNumber: 'PF3043L',
        status: 'warning'
      }
    ];
  }

  render() {
    return (
      <div className='card'>
        <span className='card-title'>Incoming Flights</span>
        <table>
          <thead>
            <tr>
              <th>Gate number</th>
              <th>Items departing</th>
              <th>Destination</th>
              <th>Flight number</th>
            </tr>
          </thead>
          <tbody>
            {this.flights.map((flight) => {
              return <Flight key={flight.number} flight={flight} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function Dashboard(props) {
  return (
    <DeparturesList />
  )
}

function TopBar(props) {
  return (
    <div className="top-bar">
      <div className="brand">Rapid Management</div>
      <div className="airport-name">Houston Airport (HOU)</div>
    </div>
  )
}

class LateralMenu extends React.Component {
  render() {
    return (
      <div className="menu-column">
        <span className="menu-item active" key="dashboard">
          <Icon name='tachometer' /> Dashboard
        </span>
        <span className="menu-item" key="critical">
          <Icon name='attention' /> Critical
        </span>
        <span className="menu-item" key="departures">
          <Icon name='takeoff' /> Departures
        </span>
        <span className="menu-item" key="arrivals">
          <Icon name='landing' /> Arrivals
        </span>
      </div>
    );
  }
}

class RapidAirport extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <div className="columns">
          <LateralMenu />
          <div className="content-column">
            <DeparturesList />
            <ArrivalsList />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <RapidAirport />,
  document.getElementById('root')
);
