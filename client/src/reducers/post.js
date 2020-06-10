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
        post: null,
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
        post:
          state.post !== null
            ? { ...state.post, likes: payload.likes }
            : state.post,
        loading: false,
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case "CREATE_POST":
      return { ...state, posts: [...state.posts, payload], loading: false };
    case "SELECT_POST":
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case "CLEAR_POSTS":
      return {
        state,
        post: null,
        posts: [],
        loading: false,
      };

    default:
      return state;
  }
};
