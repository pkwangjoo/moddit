const initialState = {
  forums: [],
  forum: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_FORUMS":
      return {
        ...state,
        forums: payload,
        loading: false,
      };

    case "SELECT_FORUM":
      return {
        ...state,
        forum: payload,
        loading: false,
      };

    case "FORUM_ERROR":
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    default:
      return state;
  }
};
