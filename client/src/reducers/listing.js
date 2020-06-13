const initialState = {
  listings: [],
  listing: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_LISTINGS":
      return {
        ...state,
        listings: payload,
        loading: false,
      };
    case "SELECT_LISTING":
      return {
        ...state,
        listing: payload,
        loading: false,
      };
    case "CREATE_LISTING":
      return {
        ...state,
        listings: [...state.listings, payload],
        loading: false,
      };

    case "DELETE_LISTING":
      return {
        ...state,
        listings: state.listings.filter((listing) => listing._id !== payload),
        loading: false,
      };

    case "UPDATE_PARTICIPANTS":
      return {
        ...state,
        listings: state.listings.map((listing) => {
          if (listing._id === payload.listing_id) {
            listing.paticipants = payload.participants;
          }

          return listing;
        }),
      };

    case "ADD_CHATROOM":
      return {
        ...state,
        listings: state.listings.map((listing) => {
          if (listing._id === payload.listing_id) {
            return payload.listing;
          }
          return listing;
        }),

        loading: false,
      };
    default:
      return state;
  }
};
