import axios from "axios";
import { addAlert } from "./alert";

export const getModule = (modData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/api/module`, modData, config);

    dispatch({
      type: "GET_MODULE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MODULE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    const errors = err.response.data.errors;

    errors.map((err) => dispatch(addAlert(err.msg, "negative")));
  }
};

export const getModules = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${user_id}/modules`);

    dispatch({
      type: "GET_MODULES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MODULE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCompletedModules = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${user_id}/completedModules`);

    dispatch({
      type: "GET_MODULES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MODULE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearModule = () => (dispatch) => {
  dispatch({
    type: "CLEAR_MODULE",
  });
};

export const clearModules = () => (dispatch) => {
  dispatch({
    type: "CLEAR_MODULES",
  });
};
