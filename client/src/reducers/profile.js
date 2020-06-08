const initialState = {
  profiles: [],
  profile: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
};
