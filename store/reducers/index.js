import { combineReducers } from "redux";

import userReducer from "./userReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";

export default combineReducers({
  userReducer,
  studentReducer,
  teacherReducer,
});
