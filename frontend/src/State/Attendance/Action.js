import { api } from "../../api/api";
import * as types from "../Attendance/ActionType";
import toast from "react-hot-toast";
// ================= GET =================
export const getAttendance = () => async (dispatch) => {
  dispatch({ type: types.GET_ATTENDANCE_REQUEST });

  try {
    const res = await api.get("/api/attendance");
    dispatch({
      type: types.GET_ATTENDANCE_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.GET_ATTENDANCE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================= ADD =================
export const addAttendance =
  ({ subjectId, attendanceDate, present }) =>
  async (dispatch) => {
    dispatch({ type: types.ADD_ATTENDANCE_REQUEST });

    try {
      const res = await api.post(
        `/api/attendance?subjectId=${subjectId}&date=${attendanceDate}&present=${present}`
      );

      dispatch({
        type: types.ADD_ATTENDANCE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.ADD_ATTENDANCE_FAILURE,
        payload:
          error.response?.data?.message || error.message,
      });
    }
  };

// ================= UPDATE =================
export const updateAttendance =
  (id, present) =>
  async (dispatch) => {
    dispatch({ type: types.UPDATE_ATTENDANCE_REQUEST });

    try {
      const res = await api.put(
        `/api/attendance/${id}?present=${present}`
      );

      dispatch({
        type: types.UPDATE_ATTENDANCE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_ATTENDANCE_FAILURE,
        payload:
          error.response?.data?.message || error.message,
      });
    }
  };

// ================= DELETE =================
export const deleteAttendance = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_ATTENDANCE_REQUEST });

  try {
    await api.delete(`/api/attendance/${id}`);
    dispatch({
      type: types.DELETE_ATTENDANCE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_ATTENDANCE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
