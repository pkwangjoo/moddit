// Load User

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import { v4 as uuid } from "uuid";
import { addAlert } from "./alert";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users/register", body, config);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data, // the token
    });

    dispatch(loadUser());

    dispatch(addAlert("User Successfully registered", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: "REGISTER_FAIL",
    });

    errors.map((err) => dispatch(addAlert(err.msg, "negative")));
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("api/users/login", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(addAlert("User successfully logged in", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: "LOGIN_FAIL",
    });

    errors.map((err) => dispatch(addAlert(err.msg, "negative")));
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
  dispatch({ type: "CLEAR_PROFILE" });
  dispatch(addAlert("Logged out", "info"));
};
