import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="body_section">
      <div className="filter_silhouete">
        <div className="welcome_section">
          <h1 className="title_text">Welcome to the TierRank Site</h1>
          <p className="desct_text">
            Creat your top 5 list for any of your interests and post it for the
            entire site to see! Share in your opinion what ranks in the top.
          </p>
          <div className="link_sections">
            <Link to="/register" className="button button-go">
              Sign Up
            </Link>
            <Link to="/login" className="button button-gray">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
