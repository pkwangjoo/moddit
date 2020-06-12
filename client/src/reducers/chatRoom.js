const initialState = {
  chatRooms: [],
  chatRoom: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_CHATROOMS":
      return { ...state, chatRooms: payload, loading: false };
    case "CREATE_CHATROOM":
      return {
        ...state,
        chatRoom: payload,
        loading: false,
      };
    case "JOIN_CHATROOM":
      return {
        ...state,
        chatRoom: payload,
        loading: false,
      };
    default:
      return state;
  }
};
