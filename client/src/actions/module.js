import axios from "axios";

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
  }
};
