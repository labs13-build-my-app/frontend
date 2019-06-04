export const initialState = {
  fetch: false,
  error: false,
  role: "",
  token: null,
  isSignedIn: null,
  user: {
    id: null,
    name: "",
    profilePictureURL: "",
    email: "",
    sub: null,
    socialMedia: {
      linkedIn: "",
      twitter: "",
      github: ""
    },
    roleType: {},
    messages: {
      subscribed: [{}]
    }
  },
  search: {}
};

export const reducer = (state, action) => {
  console.log({ action });
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          name: action.payload.name,
          profilePicutreURL: action.payload.profilePicutreURL
        }
      };
    default:
      return state;
  }
};
