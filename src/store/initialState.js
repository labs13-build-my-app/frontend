const initialState = {
  fetch: false,
  error: false,
  role: "Project Owner",
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
    project: [{}],
    plan: [{}],
    messages: {
      subscribed: [{}]
    }
  },
  search: {}
};

export default initialState;
