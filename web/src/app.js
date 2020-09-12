import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Dashboard from './views/dashboard';

const mapStateToProps = (state) => {
  const { user = { loggedIn: false } } = state.default;

  return { user };
};

export const App = ({ user }) => (
  <div>
    <Switch>
      <Route path='/*' component={Dashboard} />
    </Switch>
  </div>
);


App.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool
  }).isRequired
};

export default withRouter(connect(mapStateToProps)(App));
