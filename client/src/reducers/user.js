const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_USERS":
      return { ...state, users: payload, loading: false };
    default:
      return state;
  }
};
