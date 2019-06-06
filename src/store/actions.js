import axios from "axios";
export const FETCH_START = "FETCH_START";
export const FETCH_ROLE_SUCCESS = "FETCH_ROLE_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

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
      dispatch({ type: "FETCH_USER_FAILURE", payload: { signup: true } });
      console.log("CATCH ERR", err);
    });
};
