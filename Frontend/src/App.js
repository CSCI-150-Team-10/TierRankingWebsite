import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SubNavBar from "./components/layout/SubNavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dash from "./components/userdash/Dash";
import Home from "./components/layout/Home";////////
import AddProfile from "./components/p-form/AddProfile";
import UpdateProfile from "./components/p-form/UpdateProfile";
import AddMyExperience from "./components/p-form/AddMyExperience";
import AddMyList from "./components/p-form/AddMyList";
import PRoute from "./components/layout/routes/PRoute";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //adding empty sets of brackets allows it to only run once

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <SubNavBar />
          <Route exact path="/" component={Landing} />
          <section className="section_container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PRoute exact path="/dashboard" component={Dash} />
              <PRoute exact path="/addProfile" component={AddProfile} />
              <PRoute exact path="/updateMyProfile" component={UpdateProfile} />
              <PRoute
                exact
                path="/addMyExperience"
                component={AddMyExperience}
              />
              <PRoute exact path="/addMyList" component={AddMyList} />
              <PRoute exact path="/home" component={Home} /> 
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
