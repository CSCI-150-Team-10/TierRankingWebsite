import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const goLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Your Page</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          GET OUT!
        </a>
      </li>
    </ul>
  );
  const stopLinks = (
    <ul>
      <li>
        <Link to="#!">Users</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="hearder_nav">
      <h1>
        <Link to="/">
          TierRank
          <img src={require("../../img/little-logo.png")} />
        </Link>
      </h1>
      <span>DarkMode<input type="checkbox" id="tex"/></span>
      {!loading && <Fragment>{isAuthenticated ? goLinks : stopLinks}</Fragment>}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
