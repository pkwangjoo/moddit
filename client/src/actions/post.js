import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: "GET_POSTS",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const likePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${post_id}/like`);

    dispatch({
      type: "UPDATE_POST_LIKE",
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const unlikePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${post_id}/unlike`);

    dispatch({
      type: "UPDATE_POST_LIKE",
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (post_id) => async (dispatch) => {
  try {
    console.log(post_id + "from react");
    await axios.delete(`/api/posts/${post_id}`);

    dispatch({
      type: "DELETE_POST",
      payload: post_id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
