import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./State/Auth/Reducer";
import { branchReducer } from "./State/Branch/Reducer";
import { subjectReducer } from "./State/Subject/Reducer";
import { resourceReducer } from "./State/Resource/Reducer";
import { attendanceReducer } from "./State/Attendance/Reducer";
import sgpaReducer from "./State/Sgpa/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
  subject: subjectReducer,
  resource : resourceReducer,
  attendance : attendanceReducer,
  sgpa: sgpaReducer
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);
