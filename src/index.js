import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'semantic-ui-react'
// import FontAwesome from 'react-fontawesome';
import rapid from 'rapid-io'

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const client = rapid.createClient('NDA1OWE0MWo1b3AzY2U1LnJhcGlkLmlv')

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
    this.flightConnections = []
    this.luggageConnections = []
    this.state = {
      situations: [
        {
          gate: 'A1',
          flightNumber: '123',
          items: 0,
          status: 'Action required'
        }, {
          gate: 'B2',
          flightNumber: '234',
          items: 0,
          status: 'Resources allocated'
        }, {
          gate: 'C3',
          flightNumber: '345',
          items: 0,
          status: 'Action required'
        }, {
          gate: 'D4',
          flightNumber: '456',
          items: 0,
          status: 'Resolved'
        }
      ]
    }
  }

  subscribeToFlights() {
    var connection = client
      .collection('flights')
      .subscribe((flights, changes) => {
        this.unsubscribeFromLuggages()

        const { added, updated, removed } = changes
        var situations = this.state.situations
        added.forEach(flight => {
          this.addSituation(situations, flight)
        })
        updated.forEach(flight => {
          this.updateSituation(situations, flight)
        })
        removed.forEach(flight => {
          this.removeSituation(situations, flight)
        })
        this.setState({situations: situations})

        this.subscribeToLuggages()

      this.flightConnections.push(connection)
    })
  }

  addSituation(situations, flight) {
    situations.push({
      gate: flight.body.gate,
      flightNumber: flight.body.flightNumber,
      items: 0,
      status: 'OK'
    })
  }

  updateSituation(situations, flight) {
    situations.forEach((f, index) => {
      if (f.flightNumber.localeCompare(flight.body.flightNumber) === 0) {
        situations[index] = {
          gate: flight.body.gate,
          flightNumber: flight.body.flightNumber,
          items: 0,
          status: 'OK'
        }
      }
    })
  }

  removeSituation(situations, flight) {
    situations.forEach((f, index) => {
      if (f.flightNumber.localeCompare(flight.body.flightNumber) === 0) {
        situations.splice(index, 1)
      }
    })
  }

  unsubscribeFromFlights() {
    this.flightConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  subscribeToLuggages() {
    this.state.situations.forEach((flight, index) => {
      var connection = client
        .collection('luggages')
        .filter({gate: flight.gate})
        .subscribe((luggages, changes) => {
          const { added, updated, removed } = changes
          var situations = this.state.situations
          situations[index].items += added.length - removed.length;
          this.setState({situations: situations})
        })
      this.luggageConnections.push(connection)
    })
  }

  unsubscribeFromLuggages() {
    this.luggageConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  componentDidMount() {
    this.subscribeToFlights()
    this.subscribeToLuggages()
  }

  componentWillUnmount() {
    this.unsubscribeFromFlights()
    this.unsubscribeFromLuggages()
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
            {this.state.situations.map((situation) => {
              return <Situation key={situation.gate} situation={situation} />;
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
        <td>{this.props.flight.items}</td>
        <td>{this.props.flight.destination}</td>
        <td>{this.props.flight.flightNumber}</td>
      </tr>
    );
  }
}

class DeparturesList extends React.Component {
  constructor() {
    super();
    this.flightConnections = []
    this.luggageConnections = []
    this.state = {
      flights: [
        {
          gate: 'A1',
          items: 0,
          destination: 'JFK',
          flightNumber: 'N141XR',
          status: 'ok'
        }, {
          gate: 'B2',
          items: 0,
          destination: 'LAX',
          flightNumber: 'A418FT',
          status: 'ok'
        }, {
          gate: 'C3',
          items: 0,
          destination: 'OAK',
          flightNumber: 'SW345DR',
          status: 'critical'
        }, {
          gate: 'D4',
          items: 0,
          destination: 'SJC',
          flightNumber: 'PF3043L',
          status: 'warning'
        }
      ]
    }
  }

  subscribeToFlights() {
    var connection = client
      .collection('flights')
      .subscribe((flights, changes) => {
        this.unsubscribeFromLuggages()

        const { added, updated, removed } = changes
        var flights = this.state.flights
        added.forEach(flight => {
          this.addFlight(flights, flight)
        })
        removed.forEach(flight => {
          this.removeFlight(flights, flight)
        })
        updated.forEach(flight => {
          this.updateFlight(flights, flight)
        })
        this.setState({flights: flights})

        this.subscribeToLuggages()

      this.flightConnections.push(connection)
    })
  }

  addFlight(flights, flight) {
    flights.push({
      gate: flight.body.gate,
      items: 0,
      destination: flight.body.destination,
      flightNumber: flight.body.flightNumber,
      status: flight.body.status
    })
  }

  removeFlight(flights, flight) {
    flights.forEach((f, index) => {
      if (f.flightNumber.localeCompare(flight.body.flightNumber) === 0) {
        flights.splice(index, 1)
      }
    })
  }

  updateFlight(flights, flight) {
    flights.forEach((f, index) => {
      if (f.flightNumber.localeCompare(flight.body.flightNumber) === 0) {
        flights[index] = {
          gate: flight.body.gate,
          items: 0,
          destination: flight.body.destination,
          flightNumber: flight.body.flightNumber,
          status: flight.body.status
        }
      }
    })
  }

  unsubscribeFromFlights() {
    this.flightConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  subscribeToLuggages() {
    this.state.flights.forEach((flight, index) => {
      var connection = client
        .collection('luggages')
        .filter({gate: flight.gate})
        .subscribe((luggages, changes) => {
          const { added, updated, removed } = changes
          var flights = this.state.flights
          flights[index].items += added.length - removed.length;
          this.setState({flights: flights})
        })
      this.luggageConnections.push(connection)
    })
  }

  unsubscribeFromLuggages() {
    this.luggageConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  componentDidMount() {
    this.subscribeToFlights()
    this.subscribeToLuggages()
  }

  componentWillUnmount() {
    this.unsubscribeFromFlights()
    this.unsubscribeFromLuggages()
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
            {this.state.flights.map((flight) => {
              return <Flight key={flight.flightNumber} flight={flight} />;
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
    this.flightConnections = []
    this.luggageConnections = []
    this.state = {
      flights: [
        {
          gate: 'A1',
          items: 0,
          destination: 'JFK',
          flightNumber: 'N141XR',
          status: 'ok'
        }, {
          gate: 'B2',
          items: 0,
          destination: 'LAX',
          flightNumber: 'A418FT',
          status: 'ok'
        }, {
          gate: 'C3',
          items: 0,
          destination: 'OAK',
          flightNumber: 'SW345DR',
          status: 'critical'
        }, {
          gate: 'D4',
          items: 0,
          destination: 'SJC',
          flightNumber: 'PF3043L',
          status: 'warning'
        }
      ]
    }
  }

  subscribeToFlights() {
    var connection = client
      .collection('flights')
      .subscribe((flights, changes) => {
        this.unsubscribeFromLuggages()

        const { added, updated, removed } = changes
        var flights = this.state.flights
        added.forEach(flight => {
          this.addFlight(flights, flight)
        })
        removed.forEach(flight => {
          this.removeFlight(flights, flight)
        })
        updated.forEach(flight => {
          this.updateFlight(flights, flight)
        })
        this.setState({flights: flights})

        this.subscribeToLuggages()

      this.flightConnections.push(connection)
    })
  }

  addFlight(flights, flight) {
    flights.push({
      gate: flight.body.gate,
      items: 0,
      destination: flight.body.destination,
      flightNumber: flight.body.flightNumber,
      status: flight.body.status
    })
  }

  removeFlight(flights, flight) {
    flights.forEach((f, index) => {
      if (f.flightNumber.localeCompare(flight.body.flightNumber) === 0) {
        flights.splice(index, 1)
      }
    })
  }

  updateFlight(flights, flight) {
    flights.forEach((f, index) => {
      if (f.flightNumber.localeCompare(flight.body.flightNumber) === 0) {
        flights[index] = {
          gate: flight.body.gate,
          items: 0,
          destination: flight.body.destination,
          flightNumber: flight.body.flightNumber,
          status: flight.body.status
        }
      }
    })
  }

  unsubscribeFromFlights() {
    this.flightConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  subscribeToLuggages() {
    this.state.flights.forEach((flight, index) => {
      var connection = client
        .collection('luggages')
        .filter({gate: flight.gate})
        .subscribe((luggages, changes) => {
          const { added, updated, removed } = changes
          var flights = this.state.flights
          flights[index].items += added.length - removed.length;
          this.setState({flights: flights})
        })
      this.luggageConnections.push(connection)
    })
  }

  unsubscribeFromLuggages() {
    this.luggageConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  componentDidMount() {
    this.subscribeToFlights()
    this.subscribeToLuggages()
  }

  componentWillUnmount() {
    this.unsubscribeFromFlights()
    this.unsubscribeFromLuggages()
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
            {this.state.flights.map((flight) => {
              return <Flight key={flight.flightNumber} flight={flight} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class Cart extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.cart.cartID}</td>
        <td>{this.props.cart.status}</td>
      </tr>
    );
  }
}

class CartsList extends React.Component {
  constructor() {
    super();
    this.cartConnections = []
    this.state = {
      carts: [
        {
          cartID: 'abc123',
          status: 'Going to A1'
        }, {
          cartID: 'def456',
          status: 'Going to B2'
        }, {
          cartID: 'ghi789',
          status: 'Idle'
        }
      ]
    }
  }

  subscribeToCarts() {
    var connection = client
      .collection('carts')
      .subscribe((_, changes) => {
        const { added, updated, removed } = changes
        var carts = this.state.carts
        added.forEach(cart => {
          this.addCart(carts, cart)
        })
        removed.forEach(cart => {
          this.removeCart(carts, cart)
        })
        updated.forEach(cart => {
          this.updateCart(carts, cart)
        })
        this.setState({carts: carts})
      })
    this.cartConnections.push(connection)
  }

  unsubscribeFromCarts() {
    this.cartConnections.forEach(connection => {
      connection.unsubscribe()
    })
  }

  addCart(carts, cart) {
    carts.push({
      cartID: cart.id,
      status: cart.body.status
    })
  }

  removeCart(carts, cart) {
    carts.forEach((f, index) => {
      if (f.cartID.localeCompare(cart.id) === 0) {
        carts.splice(index, 1)
      }
    })
  }

  updateCart(carts, cart) {
    carts.forEach((f, index) => {
      if (f.cartID.localeCompare(cart.id) === 0) {
        carts[index] = {
          cartID: cart.id,
          status: cart.body.status
        }
      }
    })
  }

  componentDidMount() {
    this.subscribeToCarts()
  }

  componentWillUnmount() {
    this.unsubscribeFromCarts()
  }

  render() {
    return (
      <div className='card carts-card'>
        <span className='card-title'>Carts</span>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.carts.map((cart) => {
              return <Cart key={cart.cartID} cart={cart} />;
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
          Dashboard
        </span>
        <span className="menu-item" key="critical">
          <Icon name='attention' /> Critical
        </span>
        <span className="menu-item" key="departures">
          Departures
        </span>
        <span className="menu-item" key="arrivals">
          Arrivals
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
              <CartsList />
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
