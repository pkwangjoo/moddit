import axios from "axios";

export const getChatMessages = (chatroom_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/chatRoom/${chatroom_id}/messages`);

    dispatch({
      type: "GET_CHATMESSAGES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CHAT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const udpateChatMessages = (message) => (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_CHATMESSAGES",
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: "CHAT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
