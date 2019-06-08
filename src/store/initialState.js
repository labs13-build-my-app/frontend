const initialState = {
  fetch: false,
  error: false,
  role: "",
  token: null,
  isSignedIn: false,
  newUser: false,
  location: "/home",
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
    project: [{}],
    plan: [{}],
    messages: {
      subscribed: [{}]
    }
  },
  search: {}
};

export default initialState;
