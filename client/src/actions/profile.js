import axios from "axios";

export const getLoggedProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getUserProfile = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${user_id}`);

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formData, history, editMode = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("api/profile", formData, config);

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });

    console.log("profile created");

    if (!editMode) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(errors);
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearProfile = () => (dispatch) => {
  dispatch({
    type: "CLEAR_PROFILE",
  });
};
