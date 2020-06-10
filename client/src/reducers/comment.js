const initialState = {
  comments: [],
  comment: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case "GET_COMMENTS":
      return {
        ...state,
        comments: payload,
        loading: false,
      };

    case "SELECT_COMMENT":
      return {
        ...state,
        comment: payload,
        loading: false,
      };

    case "UPDATE_COMMENT_LIKES":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === payload.comment_id
            ? { ...comment, likes: payload.likes }
            : comment
        ),
        loading: false,
      };
    case "ADD_COMMENTREPLY":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === payload.comment_id
            ? { ...comment, replies: payload.replies }
            : comment
        ),
        loading: false,
      };
    default:
      return state;
  }
};
