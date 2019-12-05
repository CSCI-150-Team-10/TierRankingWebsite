import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DashAction from "./DashAction";
import Exp from "./Exp";
import List from "./List";
import { getProfileNow } from "../../actions/profile";

const Dash = ({
  getProfileNow,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfileNow();
  }, []); //////

  return (
    <Fragment>
      <h1 className="header1_text header-color">Dashboard</h1>
      <p className="desct_text">
        <i className="fas fa-user"></i> Salutations! {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashAction />
          <Exp exp={profile.experience} />
          <List list={profile.list} />
        </Fragment>
      ) : (
        <Fragment>
          <h2>
            Uh Oh! Looks like you don't got a Profile yet Buckaroo! Why not make
            one?
          </h2>
          <Link to="/addProfile" className="button button-go margin_1">
            Make Profile!
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dash.propTypes = {
  getProfileNow: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getProfileNow })(Dash);
