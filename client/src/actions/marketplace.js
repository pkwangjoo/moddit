import axios from "axios";
import { addAlert } from "./alert";

export const getMarketplaces = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/marketplace");

    dispatch({
      type: "GET_MARKETPLACES",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createMarketplace = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/api/marketplace", formData, config);

    dispatch({
      type: "CREATE_MARKETPLACE",
      payload: res.data,
    });

    history.push("/marketplace");
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getForumMarketplaces = (forum_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/marketplace/forum/${forum_id}`);

    {
      dispatch({
        type: "GET_MARKETPLACES",
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createForumMarketplace = (forum_id, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      `/api/marketplace/forum/${forum_id}`,
      formData,
      config
    );

    dispatch({
      type: "CREATE_MARKETPLACE",
      payload: res.data,
    });

    history.push(`/forums/${forum_id}`);
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.log(err);

    // errors.map((err) => dispatch(addAlert(err.msg, "negative")));
  }
};

export const selectMarketplace = (marketplace_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/marketplace/${marketplace_id}`);

    dispatch({
      type: "SELECT_MARKETPLACE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addMComment = (marketplace_id, formData) => async (dispatch) => {
  try {
    console.log("add comment dispatched");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/marketplace/${marketplace_id}/comments`,
      formData,
      config
    );

    dispatch({
      type: "ADD_M_COMMENT",
      payload: res.data,
    });

    dispatch({
      type: "UPDATE_COMMENTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const likeMPost = (marketplace_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/marketplace/${marketplace_id}/like`);

    dispatch({
      type: "UPDATE_M_POST_LIKE",
      payload: { marketplace_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const unlikeMPost = (marketplace_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/marketplace/${marketplace_id}/unlike`);

    dispatch({
      type: "UPDATE_M_POST_LIKE",
      payload: { marketplace_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteMPost = (marketplace_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/marketplace/${marketplace_id}`);

    dispatch({
      type: "DELETE_M_POST",
      payload: marketplace_id,
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMarketplacesByUser = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/marketplace/user/${user_id}`);

    dispatch({
      type: "GET_MARKETPLACES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMarketplacesByTag = (tagName, forumID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/marketplace/forum/${forumID}/tag/${tagName}`
    );

    dispatch({
      type: "GET_MARKETPLACES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MARKETPLACE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateMPosts = (marketplaces) => (dispatch) => {
  dispatch({
    type: "GET_MARKETPLACES",
    payload: marketplaces,
  });
};

export const clearMPost = () => (dispatch) => {
  dispatch({
    type: "CLEAR_MARKETPLACE",
  });
};
