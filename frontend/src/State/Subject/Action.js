import axios from "axios";
import { API_BASE_URL, api } from "../../api/api";
import toast from "react-hot-toast";
import {
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILURE,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAILURE,
  GET_SUBJECT_BY_ID_REQUEST,
  GET_SUBJECT_BY_ID_SUCCESS,
  GET_SUBJECT_BY_ID_FAILURE,
  GET_SUBJECT_BY_BRANCH_REQUEST,
  GET_SUBJECT_BY_BRANCH_SUCCESS,
  GET_SUBJECT_BY_BRANCH_FAILURE,
  UPDATE_SUBJECT_FAILURE,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAILURE,
  DELETE_SUBJECT_REQUEST,
  DELETE_SUBJECT_SUCCESS,
} from "./ActionType";

export const createSubject = (branchId, subjectData) => async (dispatch) => {
  dispatch({ type: CREATE_SUBJECT_REQUEST });

  try {
    const { data } = await api.post(
      `/api/subjects/branch/${branchId}`,
      subjectData,
    );

    dispatch({
      type: CREATE_SUBJECT_SUCCESS,
      payload: data,
    });
    toast.success("Subject Created Successfully");
    return { success: true, data };
  } catch (error) {
    dispatch({
      type: CREATE_SUBJECT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return { success: false, message };
  }
};

// ✅ Get All Subjects
export const getAllSubjects = () => async (dispatch) => {
  dispatch({ type: GET_SUBJECT_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/subjects`);

    dispatch({
      type: GET_SUBJECT_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);
  } catch (err) {
    dispatch({
      type: GET_SUBJECT_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// ✅ Get Subject By ID
export const getSubjectById = (id) => async (dispatch) => {
  dispatch({ type: GET_SUBJECT_BY_ID_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/subjects/${id}`);

    dispatch({
      type: GET_SUBJECT_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SUBJECT_BY_ID_FAILURE,
      payload:
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Failed to fetch subject",
    });
  }
};

// ✅ Get Subjects By Branch
export const getSubjectsByBranch = (branchId) => async (dispatch) => {
  dispatch({ type: GET_SUBJECT_BY_BRANCH_REQUEST });

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/subjects/branch/${branchId}`,
    );

    dispatch({
      type: GET_SUBJECT_BY_BRANCH_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SUBJECT_BY_BRANCH_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const updateSubject =
  (id, subjectData, branchId) => async (dispatch) => {
    dispatch({ type: UPDATE_SUBJECT_REQUEST });

    try {
      const url = branchId
        ? `/api/subjects/update/${id}?branchId=${branchId}`
        : `/api/subjects/update/${id}`;

      const { data } = await api.put(url, subjectData);

      dispatch({
        type: UPDATE_SUBJECT_SUCCESS,
        payload: data,
      });
      toast.success("Subject Updated Successfully");
      return { success: true, data };
    } catch (error) {
      dispatch({
        type: UPDATE_SUBJECT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return { success: false };
    }
  };
export const deleteSubject = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SUBJECT_REQUEST });

  try {
    await api.delete(`/api/subjects/delete/${id}`);

    dispatch({
      type: DELETE_SUBJECT_SUCCESS,
      payload: id,
    });

    toast.success("Subject Deleted Successfully");
    return { success: true };
  } catch (error) {
    dispatch({
      type: DELETE_SUBJECT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return { success: false };
  }
};
