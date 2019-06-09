const initialState = {
  isLoading: true,
  fetch: false,
  error: false,
  token: null,
  isSignedIn: false,
  newUser: false,
  role: "",
  location: "/home",
  user: {
    id: null,
    name: "",
    profilePictureURL: "",
    email: "",
    sub: null,
    userSocialMedia: {
      linkedIn: "",
      twitter: "",
      github: ""
    },
    roleSpecificUserDetails: {},
    project: [{}],
    plan: [{}],
    messages: {
      subscribed: [{}]
    }
  },
  search: {}
};

export default initialState;
