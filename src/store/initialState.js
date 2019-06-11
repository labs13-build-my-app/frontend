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
    firstName: "",
    lastName: "",
    profilePictureURL: "",
    email: "",
    sub: null,
    userSocialMedia: {
      linkedIn: "",
      twitter: "",
      github: ""
    }
    // project: [{}],
    // plan: [{}],
    // messages: {
    //   subscribed: [{}]
    // }
  }
  // search: {}
};

export default initialState;
