import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'semantic-ui-react'
// import FontAwesome from 'react-fontawesome';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

class Situation extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.situation.gate}</td>
        <td>{this.props.situation.items}</td>
        <td>{this.props.situation.status}</td>
      </tr>
    );
  }
}

class CriticalSituationsList extends React.Component {
  constructor() {
    super();
    this.situations = [
      {
        gate: 'A45',
        items: 131,
        status: 'Action required'
      }, {
        gate: 'B34',
        items: 120,
        status: 'Resources allocated'
      }, {
        gate: 'C23',
        items: 150,
        status: 'Action required'
      }, {
        gate: 'D7',
        items: 89,
        status: 'Resolved'
      }
    ];
  }

  render() {
    return (
      <div className='card situations-card'>
        <span className='card-title'>Critical situations</span>
        <table>
          <thead>
            <tr>
              <th>Gate</th>
              <th>Items</th>
              <th>Situation status</th>
            </tr>
          </thead>
          <tbody>
            {this.situations.map((situation) => {
              return <Situation key={situation.number} situation={situation} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

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
        <span className='card-title'>Departing flights</span>
        <table>
          <thead>
            <tr>
              <th>Gate</th>
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
        <span className='card-title'>Incoming flights</span>
        <table>
          <thead>
            <tr>
              <th>Gate</th>
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

class IdleCart extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.cart.carts}</td>
        <td>{this.props.cart.gate}</td>
      </tr>
    );
  }
}

class IdleCartsList extends React.Component {
  constructor() {
    super();
    this.carts = [
      {
        carts: 22,
        gate: 'A12'
      }, {
        carts: 10,
        gate: 'B4'
      }, {
        carts: 11,
        gate: 'C9'
      }
    ];
  }

  render() {
    return (
      <div className='card carts-card'>
        <span className='card-title'>Idle carts</span>
        <table>
          <thead>
            <tr>
              <th>Carts</th>
              <th>Gate</th>
            </tr>
          </thead>
          <tbody>
            {this.carts.map((cart) => {
              return <IdleCart key={cart.number} cart={cart} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class AverageLoadingTime extends React.Component {
  render() {
    return (
      <div className='card statistics-card'>
        <span className='card-title'>Average loading time</span>
        <span className='card-number'>17:39</span>
      </div>
    );
  }
}

class AverageDelayTime extends React.Component {
  render() {
    return (
      <div className='card statistics-card'>
        <span className='card-title'>Average delay time</span>
        <span className='card-number'>10:22</span>
      </div>
    );
  }
}

class StatisticsCards extends React.Component {
  render() {
    return (
      <div className='card-stack'>
        <AverageLoadingTime />
        <AverageDelayTime />
      </div>
    );
  }
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
      <div className="app">
        <TopBar />
        <div className="columns">
          <LateralMenu />
          <div className="content-column">
            <div className="cards-row">
              <CriticalSituationsList />
              <StatisticsCards />
              <IdleCartsList />
            </div>
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
