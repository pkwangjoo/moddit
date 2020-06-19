const initialState = {
  module: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_MODULE":
      return { ...state, module: payload, loading: false };
    case "MODULE_ERROR":
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
