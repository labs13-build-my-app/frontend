import axios from "axios";
export const FETCH_START = "FETCH_START";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_PORJECT_OWNER_VIEW_SUCCESS =
  "  FETCH_PORJECT_OWNER_VIEW_SUCCESS";
export const FETCH_DEVELOPER_VIEW_SUCCESS = "FETCH_DEVELOPER_VIEW_SUCCESS";
export const FETCH_PLAN_VIEW_SUCCESS = "FETCH_PLAN_VIEW_SUCCESS";
export const FETCH_PROJECT_VIEW_SUCCESS = "FETCH_PROJECT_VIEW_SUCCESS";
export const FETCH_DEVELOPERS_SUCCESS = "  FETCH_DEVELOPERS_SUCCESS";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_ADMIN_DASHBOARD_SUCCESS = "FETCH_ADMIN_DASHBOARD_SUCCESS";
export const FETCH_PROJECT_OWNER_DASHBOARD_SUCCESS =
  "FETCH_PROJECT_OWNER_DASHBOARD_SUCCESS";
export const FETCH_DEVELOPER_DASHBOARD_SUCCESS =
  "FETCH_DEVELOPER_DASHBOARD_SUCCESS";
export const FETCH_DEVELOPER_SUCCESS = "FETCH_DEVELOPER_SUCCESS";
export const FETCH_PROJECT_OWNER_SUCCESS = "FETCH_PROJECT_OWNER_SUCCESS";
export const FETCH_ADMIN_SUCCESS = "FETCH_ADMIN_SUCCESS";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PLAN_SUCCESS = "CREATE_PLAN_SUCCESS";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PLAN_SUCCESS = "UPDATE_PLAN_SUCCESS";
export const DELETE_PLAN_SUCCESS = "DELETE_PLAN_SUCCESS";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_OWNER_SUCCESS = "DELETE_PROJECT_OWNER_SUCCESS";
export const DELETE_DEVELOPER_SUCCESS = "DELETE_DEVELOPER_SUCCESS";
export const DELETE_ADMIN_SUCCESS = "DELETE_ADMIN_SUCCESS";
export const USER_SIGNUP = "USER_SIGNUP";
export const RECORD_URL_LOCATION = "RECORD_URL_LOCATION";
export const TOKEN_EXIST = "TOKEN_EXIST";
export const LOADING_COMPLETE = "LOADING_COMPLETE";

export const FETCH_DEVELOPER_LIST_START = "FETCH_DEVELOPER_LIST_START";
export const FETCH_DEVELOPER_LIST_SUCCESS = "FETCH_DEVELOPER_LIST_SUCCESS";
export const FETCH_DEVELOPER_LIST_FAILURE = "FETCH_DEVELOPER_LIST_FAILURE";

const heroku = "https://build-my-app.herokuapp.com";
const local = "http://localhost:8000";
const connection = false ? local : heroku;

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
  dispatch({ type: FETCH_START });
  console.log("in fetch user action");
  axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
    url: `${connection}/api/account/onboarding/login`
  })
    .then(res => {
      console.log("response", res);
      // Step 9 (b) Step 15 (a)  client sets role and basic user info to state -- ex. role:”Project Owner” user: {basic info}
      // Step 10 (b) Step 16 (a) client sets state isSignedIn to true and isLoading to false -- isSignedIn: true, isLoading: false
      if (!res.data.role) {
        console.log("sign up", res);
        dispatch({
          type: USER_SIGNUP,
          payload: { newUser: true }
        });
      } else {
        if (res.data.role === "Developer") {
          console.log("developer login", res);
          dispatch({
            type: FETCH_DEVELOPER_SUCCESS,
            payload: res.data
          });
        } else if (res.data.role === "Project Owner") {
          console.log("developer login", res);
          dispatch({
            type: FETCH_PROJECT_OWNER_SUCCESS,
            payload: res.data
          });
        } else if (res.data.role === "Admin") {
          // should this data be sent from different endpoint?
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
        "failed to find user please try again, user may not exist, or invalid token"
      );
      console.log("CATCH ERR", err);
    });
};

export const updateUser = () => dispatch => {};

export const deleteUser = () => dispatch => {};

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
      if (res.data.role == "Admin") {
        dispatch({
          // res.data
          // list of projests with accepted plan and developer
          // list order by recently updated
          type: FETCH_ADMIN_DASHBOARD_SUCCESS,
          payload: res.data
        });
      } else if (res.data.role === "Project Owner") {
        dispatch({
          // res.data
          // list of project owner projects
          // list of plans from devlopers submitted to project owner projects
          type: FETCH_PROJECT_OWNER_DASHBOARD_SUCCESS,
          payload: res.data
        });
      } else if (res.data.role === "Developer") {
        dispatch({
          // res.data
          // list of plans submitted
          type: FETCH_DEVELOPER_DASHBOARD_SUCCESS,
          payload: res.data
        });
      }
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
        type: CREATE_PROJECT_SUCCESS
        // Should there be a payload? or invoke fetch list or page for plan
        // payload: res.data
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const updateProject = (project, id) => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/project-owner/update-profile-project-owner/${id}`,
    data: project
  })
    .then(res => {
      dispatch({
        type: UPDATE_PROJECT_SUCCESS
        // Should there be a payload? or invoke fetch list or page for plan
        // payload: res.data
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const deleteProject = (project, id) => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/project-owner/delete-profile-project-owner/${id}`,
    data: project
  })
    .then(res => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS
        // Should there be a payload? or invoke fetch list or page for plan
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const createPlan = project => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/developer/submit-plan-developer`,
    data: project
  })
    .then(res => {
      dispatch({
        type: CREATE_PLAN_SUCCESS
        // Should there be a payload? or invoke fetch list or page for plan
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const updatePlan = project => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/developer/update-plan-developer`,
    data: project
  })
    .then(res => {
      dispatch({
        type: UPDATE_PLAN_SUCCESS
        // Should there be a payload? or invoke fetch list or page for plan
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const deletePlan = project => dispatch => {
  dispatch({ type: FETCH_START });
  axios({
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/developer/delete-plan-developer/:id`,
    data: project
  })
    .then(res => {
      dispatch({
        type: DELETE_PLAN_SUCCESS
        // Should there be a payload? or invoke fetch list or page for plan
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

export const fetchProfile = userID => dispatch => {
  // developer profile page view
  // project owner profile page view
};

export const fetchProject = projectID => dispatch => {
  // project owners project page view
};

export const fetchPlan = planID => dispatch => {
  // developers plan to a project page view
};

export const fetchDevelopers = () => dispatch => {
  dispatch({ type: FETCH_DEVELOPER_LIST_START });
  console.log("FETCHING DEVS");
  axios({
    method: "GET",
    url: "http://localhost:8000/api/users/developers",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(developers => {
      console.log(developers);
    })
    .catch(err => console.log(err));

  // list of developers
  // currently start from first created to last created
  // should implement from recently logged on to latest logged on
};

export const fectchProjects = () => dispatch => {
  // list of projects
  // list from recently created to first created
  // should only list in proposal stage
};

export const completeLoadingApp = () => dispatch => {
  dispatch({ type: "LOADING_COMPLETE" });
};
