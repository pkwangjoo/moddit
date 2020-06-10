import axios from "axios";

export const getComments = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${post_id}/comments`);

    dispatch({
      type: "GET_COMMENTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "COMMENT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const likeComment = (comment_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/comments/${comment_id}/like`);
    dispatch({
      type: "UPDATE_COMMENT_LIKES",
      payload: { comment_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: "COMMENT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const selectComment = (comment_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/comments/${comment_id}`);

    dispatch({
      type: "SELECT_COMMENT",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "COMMENT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addCommentReply = (comment_id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/comments/${comment_id}`,
      formData,
      config
    );

    dispatch({
      type: "ADD_COMMENTREPLY",
      payload: { comment_id, replies: res.data },
    });
  } catch (err) {
    dispatch({
      type: "COMMENT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
