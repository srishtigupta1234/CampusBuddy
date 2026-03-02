import axios from "axios";
import { API_BASE_URL, api } from "../../api/api";
import {
  GET_BRANCH_BY_ID_REQUEST,
  GET_BRANCH_BY_ID_FAILURE,
  GET_BRANCH_BY_ID_SUCCESS,
  GET_BRANCH_FAILURE,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAILURE,
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAILURE,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAILURE,
} from "./ActionType";
import toast from "react-hot-toast";

export const getBranchById = (id) => async (dispatch) => {
  dispatch({ type: GET_BRANCH_BY_ID_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/branch/${id}`);

    dispatch({
      type: GET_BRANCH_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BRANCH_BY_ID_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};
export const getAllBranches = () => async (dispatch) => {
  dispatch({ type: GET_BRANCH_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/branch/`);

    dispatch({
      type: GET_BRANCH_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BRANCH_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const createBranch = (branchData) => async (dispatch) => {
  dispatch({ type: CREATE_BRANCH_REQUEST });

  try {
    const { data } = await api.post(`/api/branch`, branchData);
    dispatch({ type: CREATE_BRANCH_SUCCESS, payload: data });
    toast.success("Branch Created Successfully");
    return { success: true, data };
  } catch (error) {
    dispatch({
      type: CREATE_BRANCH_FAILURE,
      payload: error.message,
    });
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return { success: false, message };
  }
};
export const deleteBranch = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BRANCH_REQUEST });

  try {
    const { data } = await api.delete(`/api/branch/delete/${id}`);

    dispatch({
      type: DELETE_BRANCH_SUCCESS,
      payload: id, // we only need id to remove from state
    });

    toast.success("Branch Deleted Successfully");
    return { success: true, message: data };
  } catch (error) {
    dispatch({
      type: DELETE_BRANCH_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return { success: false };
  }
};
export const updateBranch = (id, branchData) => async (dispatch) => {
  dispatch({ type: UPDATE_BRANCH_REQUEST });

  try {
    const { data } = await api.put(`/api/branch/update/${id}`, branchData);

    dispatch({
      type: UPDATE_BRANCH_SUCCESS,
      payload: data,
    });

    toast.success("Branch Updated Successfully");
    return { success: true, data };
  } catch (error) {
    dispatch({
      type: UPDATE_BRANCH_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return { success: false };
  }
};
