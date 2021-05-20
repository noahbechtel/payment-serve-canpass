import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me} from './store'
import StripeCheckout from 'react-stripe-checkout'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      card: '',
      email: '',
      client_ip: '',
      brand: '',
      country: '',
      last4: ''
    }
  }
  onToken = token => {
    const {id, email, client_ip} = token
    const {brand, country, last4} = token.card
    const card = token.card.id
    this.setState({id, card, email, client_ip, brand, country, last4})
  }
  render() {
    const {id, card, email, client_ip, brand, country, last4} = this.state
    return (
      <div>
        {id !== '' ? (
          <div>
            <p>Payment token: {id}</p>
            <p>Email: {email}</p>
            <p>Client Country: {country}</p>
            <p>Client IP: {client_ip}</p>
            <p>Card token: {card}</p>
            <p>Card Issuer: {brand}</p>
            <p>Card Last Four: {last4}</p>
          </div>
        ) : null}
        <StripeCheckout
          amount={100.0}
          // billingAddress
          description="Test"
          image={null}
          locale="auto"
          stripeKey="pk_test_51Hunp9DchL2cGl0JPXE4R1onCDCeHFL1HZuIZH2wXycdaeKIbttFN322uSKGAx0eGJmc0RYRp1JRQV795pvCqSje00wV7c1Se9"
          token={this.onToken}
          label="Pay with 💳"
          panelLabel="Test Payment"
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
