import initialState from "./initialState";
import { usersReducer, projectsReducer, profileReducer } from "./reducer";

const store = {
  initialState,
  usersReducer,
  projectsReducer,
  profileReducer
};
export default store;
