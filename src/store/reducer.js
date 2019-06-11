import {
  FETCH_START,
  FETCH_FAILURE,
  FETCH_USER_FAILURE,
  FETCH_PORJECT_OWNER_VIEW_SUCCESS,
  FETCH_DEVELOPER_VIEW_SUCCESS,
  FETCH_PLAN_VIEW_SUCCESS,
  FETCH_PROJECT_VIEW_SUCCESS,
  FETCH_DEVELOPERS_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_OWNER_DASHBOARD_SUCCESS,
  FETCH_DEVELOPER_DASHBOARD_SUCCESS,
  FETCH_ADMIN_DASHBOARD_SUCCESS,
  FETCH_ADMIN_SUCCESS,
  FETCH_PROJECT_OWNER_SUCCESS,
  FETCH_DEVELOPER_SUCCESS,
  // FETCH_PROJECT_OWNERS_SUCCES,
  // FETCH_PLANS_SUCCES,
  CREATE_PROJECT_SUCCESS,
  CREATE_PLAN_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PLAN_SUCCESS,
  DELETE_PLAN_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_OWNER_SUCCESS,
  DELETE_DEVELOPER_SUCCESS,
  DELETE_ADMIN_SUCCESS,
  USER_SIGNUP,
  RECORD_URL_LOCATION,
  TOKEN_EXIST,
  LOADING_COMPLETE
} from "./actions";

export const usersReducer = (state, action) => {
  switch (action.type) {
    case LOADING_COMPLETE:
      return {
        ...state,
        isLoading: false
      };
    case TOKEN_EXIST:
      return {
        ...state,
        token: action.payload.token
        // isLoading: false
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        newUser: true
      };
    case RECORD_URL_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case FETCH_START:
      return {
        ...state,
        fetch: true
      };
    case USER_SIGNUP:
      return {
        ...state,
        newUser: true
      };
    case FETCH_DEVELOPER_SUCCESS:
      return {
        ...state,
        fetch: false,
        isSignedIn: true,
        isLoading: false,
        role: action.payload.role,
        user: {
          ...state.user,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          userSocialMedia: {
            linkedIn: action.payload.linkedIn,
            github: action.payload.gitHub,
            twitter: action.payload.twitter
          },
          developerDetails: {
            skills: action.payload.skills,
            devType: action.payload.devType
          }
        }
      };
    case FETCH_PROJECT_OWNER_SUCCESS:
      return {
        ...state,
        fetch: false,

        isSignedIn: true,
        isLoading: false,
        role: action.payload.role,
        user: {
          ...state.user,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          userSocialMedia: {
            linkedIn: action.payload.linkedIn,
            github: action.payload.gitHub,
            twitter: action.payload.twitter
          },
          projectOwnerDetails: {}
        }
      };
    case FETCH_ADMIN_SUCCESS:
      return {
        ...state,
        fetch: false,
        isSignedIn: true,
        isLoading: false,
        role: action.payload.role,
        user: {
          ...state.user,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          adminDetails: {}
        }
      };
    case FETCH_ADMIN_DASHBOARD_SUCCESS:
      return {
        ...state,
        fetch: false,
        error: false,
        user: {
          ...state.user,
          dashboardData: action.payload
        }
      };
    case FETCH_DEVELOPER_DASHBOARD_SUCCESS:
      return {
        ...state,
        fetch: false,
        error: false,
        user: {
          ...state.user,
          dashboardData: action.payload
        }
      };
    case FETCH_PROJECT_OWNER_DASHBOARD_SUCCESS:
      return {
        ...state,
        fetch: false,
        error: false,
        user: {
          ...state.user,
          dashboardData: action.payload
        }
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        fetch: false,
        user: {
          ...state.user,
          project: [...state.user.project, action.payload]
        }
      };
    default:
      return state;
  }
};

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      // Implement pagination
      const paginatedProjects = action.payload.projects.map(project => {
        return {
          id: project.id,
          created_at: project.created_at,
          name: project.name,
          description: project.description,
          projectStatus: project.projectStatus,
          projectOwner_id: project.projectOwner_id
        };
      });

      return {
        // needs to updated to include pagination in state
        projects: [...state.projects, ...paginatedProjects]
      };
    // case FETCH_PLANS_SUCCESS:
    //   // NOT PART OF MVP GOALS
    //   // implement pagination???
    //   return {
    //     ...state
    //   };
    case FETCH_PROJECT_VIEW_SUCCESS:
      return {
        projectView: {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          features: action.payload.technologiesToUse,
          budget: action.payload.budget,
          projectStatus: action.payload.projectStatus,
          projectOwner: {
            id: action.payload.projectOwner.id,
            firstName: action.payload.projectOwner.firstName,
            lastName: action.payload.projectOwner.lastName,
            profileImageURL: action.payload.projectOwner.profileImageURL
          }
        }
      };
    case FETCH_PLAN_VIEW_SUCCESS:
      return {
        planView: {
          id: action.payload.id,
          project_id: action.payload.project_id,
          name: action.payload.name,
          description: action.payload.description,
          skills: action.payload.skills,
          developer_id: action.payload.developer_id
        }
      };
    default:
      return {
        projects: [
          {
            id: null,
            created_at: null,
            name: "",
            description: "",
            projectStatus: "",
            projectOwner_id: null
          }
        ],
        projectView: {
          id: null,
          name: "",
          description: "",
          features: "",
          budget: "",
          projectStatus: "",
          projectOwner: {
            id: null,
            firstName: "",
            lastName: "",
            profileImageURL: ""
          }
        },
        plans: [
          {
            id: null,
            project_id: null,
            created_at: null,
            updated_at: null,
            name: "",
            description: "",
            skills: "",
            developer_id: null
          }
        ],
        planView: {
          id: null,
          project_id: null,
          name: "",
          description: "",
          skills: "",
          developer_id: null
        }
      };
  }
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DEVELOPERS_SUCCESS:
      const paginatedDevelopers = action.payload.developers.map(developer => {
        return {
          id: developer.id,
          firstName: developer.firstName,
          lastName: developer.lastName,
          email: developer.email,
          profileImageURL: developer.profileImageURL,
          skills: developer.skills,
          role: developer.role,
          devType: developer.devType,
          created_at: developer.created_at,
          updated_at: developer.updated_at
        };
      });
      // Implement pagination
      return {
        developers: [...state.developers, paginatedDevelopers]
      };
    // case FETCH_PROJECT_OWNERS_SUCCESS:
    //   // NOT PART OF MVP GOALS
    //   // Implement pagination
    //   return {
    //     ...state
    //   };
    case FETCH_DEVELOPER_VIEW_SUCCESS:
      return {
        developerView: {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profileImageURL: action.payload.profileImageURL,
          email: action.payload.email,
          skills: action.payload.skills,
          devType: action.payload.devType,
          linkedIn: action.payload.linkedIn,
          github: action.payload.gitHub,
          twitter: action.payload.twitter,
          role: action.payload.role,
          feedback: [...action.payload.feedback] // this comes from projects completed, might need to be adjusted
        }
      };
    case FETCH_PORJECT_OWNER_VIEW_SUCCESS:
      return {
        projectOwnerView: {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profileImageURL: action.payload.profileImageURL,
          email: action.payload.email,
          linkedIn: action.payload.linkedIn,
          github: action.payload.gitHub,
          twitter: action.payload.twitter,
          role: action.payload.role
        }
      };
    default: {
      return {
        developers: [
          {
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            profileImageURL: "",
            skills: "",
            role: "",
            devType: "",
            created_at: null,
            updated_at: null
          }
        ],
        developerView: {
          id: null,
          firstName: "",
          lastName: "",
          profileImageURL: "",
          email: "",
          skills: "",
          devType: "",
          linkedIn: "",
          github: "",
          twitter: "",
          role: "",
          feedback: [] // this comes from projects completed, might need to be adjusted
        },
        // projectOwners: [{}],
        projectOwnerView: {
          id: null,
          firstName: "",
          lastName: "",
          profileImageURL: "",
          email: "",
          linkedIn: "",
          github: "",
          twitter: "",
          role: ""
        }
      };
    }
  }
};
