import axios from "axios";

export const getChatRooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/chat/chatRoom");

    dispatch({
      type: "GET_CHATROOMS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CHATROOM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPrivateChat = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/chatRoom/private/${user_id}`);

    dispatch({
      type: "GET_CHATROOMS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CHATROOM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createChatRoom = (roomData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/chat/chatRoom", roomData, config);

    dispatch({
      type: "CREATE_CHATROOM",
      payload: res.data,
    });

    history.push("/chat");
  } catch (err) {
    dispatch({
      type: "CHATROOM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const joinChatRoom = (chatroom_id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/chatRoom/${chatroom_id}`);

    dispatch({
      type: "JOIN_CHATROOM",
      payload: res.data,
    });

    history.push("/chat");
  } catch (err) {
    dispatch({
      type: "CHATROOM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const privateChat = (userData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/chat/chatRoom/private",
      userData,
      config
    );

    console.log(res.data);

    dispatch({
      type: "JOIN_CHATROOM",
      payload: res.data,
    });

    history.push("/chat");
  } catch (err) {
    dispatch({
      type: "CHATROOM_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
