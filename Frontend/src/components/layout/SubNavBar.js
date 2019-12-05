import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const SubNavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const subgoLinks = (
    <div className="category_container">
      <div className="category_container_Button">
        <span className="category_container_topic">
          <a href="#" className="category_container_link">
            <i className="fas fa-desktop"></i>Electronics
          </a>
        </span>
      </div>
      <div className="category_container_Button">
        <span className="category_container_topic">
          <a href="#" className="category_container_link">
            <i className="fas fa-heartbeat"></i>Health & Fitness
          </a>
        </span>
      </div>
      <div className="category_container_Button">
        <span className="category_container_topic">
          <a href="#" className="category_container_link">
            <i className="fas fa-ghost"></i>Gaming
          </a>
        </span>
      </div>
      <div className="category_container_Button">
        <span className="category_container_topic">
          <a href="#" className="category_container_link">
            <i className="fas fa-book-reader"></i>Education
          </a>
        </span>
      </div>
      <div className="category_container_Button">
        <span className="category_container_topic">
          <a href="#" className="category_container_link">
            <i className="fas fa-music"></i>Music
          </a>
        </span>
      </div>
    </div>
  );
  return (
    <div>
      {!loading && <Fragment>{isAuthenticated ? subgoLinks : ""}</Fragment>}
    </div>
  );
};

SubNavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(SubNavBar);
