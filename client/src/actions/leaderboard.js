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

export const getLeaderboardsByUser = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/leaderboard/${user_id}`);

    dispatch({
      type: "SELECT_LEADERBOARD",
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