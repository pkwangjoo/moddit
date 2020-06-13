const initialState = {
  chatMessages: [],
  chatMessage: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_CHATMESSAGES":
      return {
        ...state,
        chatMessages: payload,
        loading: false,
      };
    case "UPDATE_CHATMESSAGES":
      return {
        ...state,
        chatMessages: [...state.chatMessages, payload],
      };

    case "CHAT_ERROR":
      return { ...state, error: payload };
    default:
      return state;
  }
};
