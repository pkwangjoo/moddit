import axios from "axios";

export const getLeaderboards = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/leaderboard");

    dispatch({
      type: "GET_LEADERBOARDS",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "LEADERBOARD_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};