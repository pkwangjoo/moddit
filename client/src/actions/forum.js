import axios from "axios";

export const getForums = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/forums");

    dispatch({
      type: "GET_FORUMS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "FORUM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const selectForum = (forum_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/forums/${forum_id}`);
    console.log("select forum dispatched");

    dispatch({
      type: "SELECT_FORUM",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "FORUM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addForum = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/forums", formData, config);

    dispatch({
      type: "ADD_FORUM",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "FORUM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

