const initialState = {
  marketplaces: [],
  marketplace: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_MARKETPLACES":
      return {
        ...state,
        marketplaces: payload,
        marketplace: null,
        loading: false,
      };

    case "CREATE_MARKETPLACE":
      return {
        ...state,
        marketplaces: [...state.marketplaces, payload],
        loading: false,
      };

    case "SELECT_MARKETPLACE":
      return {
        ...state,
        marketplace: payload,
        loading: false,
      };

    case "ADD_M_COMMENT":
      return {
        ...state,
        marketplace: { ...state.marketplace, comments: payload },
        loading: false,
      };
    case "UPDATE_M_POST_LIKE":
      return {
        ...state,
        marketplaces: state.marketplaces.map((marketplace) =>
          marketplace._id === payload.marketplace_id
            ? { ...marketplace, likes: payload.likes }
            : marketplace
        ),
        marketplace:
          state.marketplace !== null
            ? { ...state.marketplace, likes: payload.likes }
            : state.marketplace,
        loading: false,
      };
    case "DELETE_M_POST":
      return {
        ...state,
        marketplaces: state.marketplaces.filter(
          (marketplace) => marketplace._id !== payload
        ),
      };

    case "MARKETPLACE_ERROR":
      return {
        ...state,
        error: payload,
      };

    case "CLEAR_MARKETPLACE":
      return {
        ...state,
        marketplaces: [],
        marketplace: null,
      };

    default:
      return state;
  }
};
