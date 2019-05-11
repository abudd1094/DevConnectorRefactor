import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
) // above we redirect to login if the user is not logged in and the page is not loading, otherwise we display the component with the appropriate props

PrivateRoute.propTypes = {

}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
