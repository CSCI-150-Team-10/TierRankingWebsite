import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
const PRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(mapStatetoProps)(PRoute);
