import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/all");

    dispatch({
      type: "GET_USERS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "USER_ERROR",
    });
  }
};
