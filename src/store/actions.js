import axios from "axios";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const FETCH_DEVELOPER_SUCCESS = "FETCH_DEVELOPER_SUCCESS";
export const FETCH_PROJECT_OWNER_SUCCESS = "FETCH_PROJECT_OWNER_SUCCESS";
export const FETCH_ADMIN_SUCCESS = "FETCH_ADMIN_SUCCESS";
export const TOKEN_EXIST = "TOKEN_EXIST";
export const FETCH_START = "FETCH_START";
export const USER_SIGNUP = "USER_SIGNUP";
export const RECORD_URL_LOCATION = "RECORD_URL_LOCATION";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";

const heroku = "https://build-my-app.herokuapp.com";
const local = "http://localhost:8000";
const connection = true ? local : heroku;

export const locationRestore = location => dispatch => {
  dispatch({
    type: RECORD_URL_LOCATION,
    payload: location
  });
};

export const saveToken = token => dispatch => {
  if (token)
    dispatch({ type: TOKEN_EXIST, payload: { token: true, isLoading: true } });
  else
    dispatch({
      type: TOKEN_EXIST,
      payload: { token: false, isLoading: false }
    });
};

export const fetchUser = token => dispatch => {
  // on login schema
  // role: ["Developer", "Project Owner"]
  // user: {
  // id: 0,
  // firstName: "",
  // lastName: "",
  // email: "",
  // skills: "",
  // devType: [mobile, andriod, iOS, web],
  // linkedIn: "",
  // gitHub: "",
  // twitter: "",
  // }
  dispatch({ type: FETCH_START });
  axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
    url: `${connection}/api/account/onboarding/login`
  })
    .then(res => {
      // Step 9 (b) Step 15 (a)  client sets role and basic user info to state -- ex. role:”Project Owner” user: {basic info}
      // Step 10 (b) Step 16 (a) client sets state isSignedIn to true and isLoading to false -- isSignedIn: true, isLoading: false
      if (!res.data.sub) {
        dispatch({
          type: USER_SIGNUP,
          payload: { newUser: true }
        });
      } else {
        if (res.data.role === "Developer") {
          dispatch({
            type: FETCH_DEVELOPER_SUCCESS,
            payload: res.data
          });
        } else if (res.data.role === "Project Owner") {
          dispatch({
            type: FETCH_PROJECT_OWNER_SUCCESS,
            payload: res.data
          });
        } else if (res.data.role === "Admin") {
          dispatch({
            type: FETCH_ADMIN_SUCCESS,
            payload: res.data
          });
        }
      }
    })
    .catch(err => {
      dispatch({ type: FETCH_USER_FAILURE });
      console.log(
        "failed to fine user please try again, user may not exist, or invalid token"
      );
      console.log("CATCH ERR", err);
    });
};

export const signup = user => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/onboarding/signup`,
    data: user
  })
    .then(res => {
      if (res.data.role === "Developer") {
        dispatch({
          type: FETCH_DEVELOPER_SUCCESS,
          payload: res.data
        });
      } else if (res.data.role === "Project Owner") {
        dispatch({
          type: FETCH_PROJECT_OWNER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: FETCH_FAILURE });
      console.log(err);
    });
};

export const fetchDashboard = endpoint => dispatch => {
  dispatch({ type: FETCH_START });
  console.log("getting user Dashboard details");
  axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}${endpoint}`
  })
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_DASHBOARD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: FETCH_USER_FAILURE });
      console.log(err);
    });
};

export const createProject = project => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/projects/create-project-project-owner`,
    data: project
  })
    .then(res => {
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const completeLoadingApp = () => dispatch => {
  dispatch({ type: "LOADING_COMPLETE" });
};
