const initialState = {
    leaderboards: [],
    leaderboard: null,
    loading: true,
    error: {},
  };
  
  export default (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "GET_LEADERBOARDS":
        return {
          ...state,
          leaderboards: payload,
          loading: false,
        };

      
      case "SELECT_LEADERBOARD":
        return {
          ...state,
          leaderboard: payload,
          loading: false,
        }
  
      case "LEADERBOARD_ERROR":
        return {
          ...state,
          error: payload,
        };

      default:
        return state;
    }
  };
  