export const initialState = {
  fetch: false,
  error: false,
  role: "",
  token: null,
  isSignedIn: null,
  user: {
    id: null,
    firstName: "",
    lastName: "",
    profilePictureURL: "",
    email: "",
    sub: null,
    socialMedia: {
      linkedIn: "",
      twitter: "",
      github: ""
    },
    developer: {},
    projectOwner: {},
    admin: {},
    messages: {
      subscribed: [{}]
    }
  },
  search: {}
};

export const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      console.log(state);
      return {
        ...state,
        role: action.payload.role,
        user: {
          ...state.user,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      };
    default:
      return state;
  }
};
