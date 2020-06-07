const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case "POST_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "UPDATE_POST_LIKE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.post_id
            ? { ...post, likes: payload.likes }
            : post
        ),
        loading: false,
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    default:
      return state;
  }
};
