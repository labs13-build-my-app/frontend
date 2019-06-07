const initialState = {
  fetch: false,
  error: false,
  role: "developer",
  token: null,
  isSignedIn: false,
  signup: false,
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
    messages: {
      subscribed: [{}]
    }
  },
  search: {}
};

export default initialState;
