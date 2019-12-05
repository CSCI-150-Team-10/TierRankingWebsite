import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken"; //imports the auth token

// this will load the user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data //the data sent from the route
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// this section is to regiester the user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config); //request to the backend

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data //returns the token
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors; //get errors from array

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "wrong"))); //look at erros from array
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// this will log in the user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "wrong")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// this will logout the user and clear the profile from the cache

export const logout = () => dispatch => {
    
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
