import React from "react";
import { Link } from "react-router-dom";
const DashAction = () => {
  return (
    <div className="dashboard_resources">
      <Link to="/updateMyProfile" className="button button-go">
        <i className="fas fa-user-circle header-side-color"></i> Edit Profile
      </Link>
      <Link to="/addMyExperience" className="button button-go">
        <i className="fas fa-hand-spock header-side-color"></i> Add Experience
      </Link>
      <Link to="/addMyList" className="button button-go">
        <i className="fas fa-file-alt header-side-color"></i> Add List
      </Link>
    </div>
  );
};
export default DashAction;
