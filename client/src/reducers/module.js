const initialState = {
  module: null,
  modules: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_MODULE":
      return { ...state, module: payload, loading: false };
    case "GET_MODULES":
      return {
        ...state,
        modules: payload,
        loading: false,
      };
    case "MODULE_ERROR":
      return { ...state, error: payload, loading: false };

    case "CLEAR_MODULE":
      return { ...state, module: null, loading: false };

    default:
      return state;
  }
};
