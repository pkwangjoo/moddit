import axios from "axios";

export const getListings = (form_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/listing/forum/${form_id}`);

    dispatch({
      type: "GET_LISTINGS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "LISTING_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const selectListing = (listing_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/listing/${listing_id}`);
    console.log(res.data);

    dispatch({
      type: "SELECT_LISTING",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "LISTING_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createListing = (forum_id, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/listing/forum/${forum_id}`,
      formData,
      config
    );

    dispatch({
      type: "CREATE_LISTING",
      payload: res.data,
    });

    history.push(`/forums/${forum_id}`);
  } catch (err) {
    dispatch({
      type: "LISTING_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteListing = (listing_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/listing/${listing_id}`);

    dispatch({
      type: "DELETE_LISTING",
      payload: listing_id,
    });
  } catch (err) {
    dispatch({
      type: "LISTING_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addParticipant = (listing_id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/listing/${listing_id}/participants`);

    dispatch({
      type: "UPDATE_PARTICIPANTS",
      payload: { listing_id, participants: res.data },
    });
  } catch (err) {
    dispatch({
      type: "LISTING_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addChatRoom = (listing_id, roomData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/listing/${listing_id}/chatRoom`,
      roomData,
      config
    );

    dispatch({
      type: "ADD_CHATROOM",
      payload: { listing_id, listing: res.data },
    });
  } catch (err) {
    dispatch({
      type: "LISTING_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
