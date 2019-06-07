import axios from "axios";
export const FETCH_START = "FETCH_START";
export const LOGIN_USER = "LOGIN_USER";
export const RECORD_URL_LOCATION = "RECORD_URL_LOCATION";
export const FETCH_ROLE_SUCCESS = "FETCH_ROLE_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";

export const fetchUser = endpoint => dispatch => {
  dispatch({ type: FETCH_START });
  axios
    .get(endpoint)
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: res.data.user
      });
    })
    .catch(err => dispatch({ type: FETCH_FAILURE, payload: err }));
};

export const fetchRole = token => dispatch => {
  axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
    url: "http://localhost:8000/api/account/onboarding/login"
  })
    .then(res => {
      return dispatch({
        type: FETCH_ROLE_SUCCESS,
        payload: res.data.role
      });
    })
    .catch(err => {
      dispatch({ type: FETCH_USER_FAILURE, payload: { signup: true } });
      console.log("CATCH ERR", err);
    });
};

export const signup = user => dispatch => {
  axios({
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: "http://localhost:8000/api/account/onboarding/signup",
    data: user
  })
    .then(res => console.log(res, "here"))
    .catch(err => console.log(err));
};

export const createProject = project => dispatch => {
  axios({
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: "http://localhost:8000/api/projects/create-project-project-owner",
    data: project
  })
    .then(res => {
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
