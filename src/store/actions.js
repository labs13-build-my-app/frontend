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
const connection = true ? local : heroku;

export const completeLoadingApp = dispatch => {
  dispatch({ type: "LOADING_COMPLETE" });
};

export const locationRestore = (location, dispatch) => {
  dispatch({
    type: RECORD_URL_LOCATION,
    payload: location
  });
};

// might not need this action anymore
export const saveToken = (token, dispatch) => {
  if (token)
    dispatch({ type: TOKEN_EXIST, payload: { token: true, isLoading: true } });
  else
    dispatch({
      type: TOKEN_EXIST,
      payload: { token: false, isLoading: false }
    });
};

// fetch or login user
export const fetchUser = (token, dispatch) => {
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
      if (!res.data.role) {
        dispatch({
          type: USER_SIGNUP,
          payload: { isNewUser: true }
        });
      } else if (res.data.role === "Developer") {
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
      console.log(
        "failed to find user please try again, user may not exist, or invalid token"
      );
      console.log("CATCH ERR", err);
    });
};

// fetch user profile
export const fetchProfile = (userId, dispatch) => {
  console.log(userId);
  axios({
    method: "GET",
    url: `${connection}/api/users/profile/${userId}`
  })
    .then(res => {
      console.log(res);
      dispatch(res.data);
    })
    .catch(error => {
      console.log(error);
    });
};

// fetch developer profile -- do we need this? we have fetch profile
export const fetchDeveloper = (developer_id, dispatch) => {
  axios({
    method: "GET",
    url: `${connection}/api/users/user-developer/${developer_id}`,
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => {
      dispatch(res.data);
    })
    .catch(err => console.log(err));
};

// fetch list of developers
// list are paginated
export const fetchDevelopers = (dispatch, setPage) => {
  // dispatch({ type: FETCH_START });
  console.log(" in fetch Developers");
  axios({
    method: "GET",
    url: `${connection}/api/users/list-developers`,
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => {
      // what this here? this doesn't look right
      console.log(res);
      dispatch(prevState => [...prevState, ...res.data.developers]);
    })
    .catch(err => {
      dispatch({ type: "FETCH_FAIL" });
    });
};

// export const fetchDevelopers = () => dispatch => {
//   axios({
//     method: "GET",
//     url: "http://localhost:8000/api/users/developers",
//     headers: {
//       "content-type": "application/json",
//       Authorization: localStorage.getItem("token")
//     }
//   })
//     .then(res => {
//       console.log(res.data);
//       dispatch(res.data);
//     })
//     .catch(err => console.log(err));
// };

// update user account info
export const updateUser = (user, dispatch) => {};

// delete user
export const deleteUser = dispatch => {};

// signup new user
export const signup = (user, dispatch) => {
  dispatch({ type: FETCH_START });
  axios({
    method: "POST",
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

// create a project for project owner
export const createProject = (project, dispatch) => {
  dispatch({ type: FETCH_START });
  axios({
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/project-owner/create-project`,
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

// export const updateProject = (project, id) => dispatch => {
//   dispatch({ type: FETCH_START });
//   axios({
//     method: "PUT",
//     headers: {
//       "content-type": "application/json",
//       Authorization: localStorage.getItem("token")
//     },
//     url: `${connection}/api/account/project-owner/update-profile-project-owner/${id}`,
//     data: project
//   })
//     .then(res => {
//       dispatch({
//         type: UPDATE_PROJECT_SUCCESS
//         // Should there be a payload? or invoke fetch list or page for plan
//         // payload: res.data
//       });
//     })
//     .catch(error => {
//       dispatch({ type: FETCH_FAILURE });
//       console.log(error.message);
//     });
// };

// update a project
export const updateProject = (project_id, project, history, dispatch) => {
  axios({
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/project-owner/update-project/${project_id}`,
    data: project
  })
    .then(res => {
      dispatch.push(`/projects/project/${res.data.id}`);
    })
    .catch(err => console.log(err));
};

// delete a project
export const deleteProject = (project_id, dispatch) => {
  dispatch({ type: FETCH_START });
  axios({
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/project-owner/delete-project/${project_id}`
  })
    .then(res => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

// create a new plan
export const createPlan = (plan, project_id, dispatch) => {
  dispatch({ type: FETCH_START });
  axios({
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/developer/submit-plan/${project_id}`,
    data: plan
  })
    .then(res => {
      dispatch({
        type: CREATE_PLAN_SUCCESS
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

// updatea  plan
export const updatePlan = (plan, plan_id, dispatch) => {
  dispatch({ type: FETCH_START });
  axios({
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/developer/update-plan/${plan_id}`,
    data: plan
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

// delete a plan
export const deletePlan = (plan_id, dispatch) => {
  dispatch({ type: FETCH_START });
  axios({
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/developer/delete-plan/${plan_id}`
  })
    .then(res => {
      dispatch({
        type: DELETE_PLAN_SUCCESS
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE });
      console.log(error.message);
    });
};

// list of plans for developer
export const fetchDeveloperPlans = (developer_id, dispatch) => {
  axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/projects/plan-list-developer/${developer_id}`
  })
    .then(res => {
      res.data.message === "No Plans" ? dispatch([]) : dispatch(res.data);
    })
    .catch(error => {
      console.log("Error", error);
    });
};

// list of projects  for project owner
export const fecthProjectOwnerProjectsList = (project_Owner_Id, dispatch) => {
  axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/projects/project-list/${project_Owner_Id}`
  })
    .then(res => {
      res.data.message === "No Projects" ? dispatch([]) : dispatch(res.data);
    })
    .catch(error => {
      console.log("Error", error);
    });
};

// page view of a project
export const fetchProject = (projectId, formatDate, formatBudget, dispatch) => {
  axios
    .get(`${connection}/api/projects/project-view/${projectId}`)
    .then(res => {
      const newDueDate = formatDate(res.data.dueDate);
      const newBudget = formatBudget(res.data.budget);
      dispatch({ ...res.data, budget: newBudget, dueDate: newDueDate });
    })
    .catch(err => console.log(err));
};

// page view of a plan
export const fetchPlan = (plan_id, dispatch) => {
  axios({
    method: "GET",
    url: `${connection}/api/projects/plan-view/${plan_id}`
  })
    .then(res => dispatch(res.data))
    .catch(err => console.log(err));
};

// paginated list of projects
export const fetchProjects = dispatch => {
  axios
    .get(`${connection}/api/projects/paginated-list-of-projects`)
    .then(res => {
      dispatch(res.data.projects);
    })
    .catch(err => console.log(err));
};

// feedback for a developer from a project owner for work on a project
export const getDeveloperFeedback = (developer_id, dispatch) => {
  axios({
    method: "GET",
    url: `${connection}/api/projects/developer-feedback/${developer_id}`
  })
    .then(res => dispatch(res.data))
    .catch(err => console.log(err));
};

// list of plans of a project
export const listProjectPlans = (project_id, dispatch) => {
  axios({
    method: "GET",
    url: `${connection}/api/projects/plan-list-project/${project_id}`
  })
    .then(res => dispatch(res.data))
    .catch(err => console.log(err));
};

// plan confirmation from a project owner
export const acceptPlan = (project_id, plan, dispatch) => {
  axios({
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${connection}/api/account/project-owner/accept-plan/${project_id}`,
    data: plan
  })
    .then(res => console.log(res, "here"))
    .catch(err => console.log(err));
};
export const sendEmail = (email) => {
  axios({
    method: "POST",
    url: `${connection}/api/message`,
    data: email
  })
    .then(res => {
      console.log(res.data);
      
    })
    .catch(err => console.log(err));
};
