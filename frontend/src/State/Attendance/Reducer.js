import * as types from "../Attendance/ActionType";

const initialState = {
  attendance: [],
  loading: false,
  error: null,
};

export const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {

    // ================= GET =================
    case types.GET_ATTENDANCE_REQUEST:
    case types.ADD_ATTENDANCE_REQUEST:
    case types.UPDATE_ATTENDANCE_REQUEST:
    case types.DELETE_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: action.payload,
      };

    case types.ADD_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: [...state.attendance, action.payload],
      };

    case types.UPDATE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: state.attendance.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case types.DELETE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: state.attendance.filter(
          (item) => item.id !== action.payload
        ),
      };

    // ================= FAILURE =================
    case types.GET_ATTENDANCE_FAILURE:
    case types.ADD_ATTENDANCE_FAILURE:
    case types.UPDATE_ATTENDANCE_FAILURE:
    case types.DELETE_ATTENDANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
