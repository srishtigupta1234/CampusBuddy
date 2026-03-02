import axios from "axios";
import { API_BASE_URL, api } from "../../api/api";
import toast from "react-hot-toast";
import {
  GET_RESOURCE_REQUEST,
  GET_RESOURCE_SUCCESS,
  GET_RESOURCE_FAILURE,
  GET_RESOURCE_BY_TYPE_REQUEST,
  GET_RESOURCE_BY_TYPE_SUCCESS,
  GET_RESOURCE_BY_TYPE_FAILURE,
  GET_RESOURCE_BY_SUBJECT_REQUEST,
  GET_RESOURCE_BY_SUBJECT_SUCCESS,
  GET_RESOURCE_BY_SUBJECT_FAILURE,
  CREATE_RESOURCE_REQUEST,
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_FAILURE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAILURE,
  UPDATE_RESOURCE_REQUEST,
  UPDATE_RESOURCE_SUCCESS,
} from "./ActionType";

export const getAllResources = () => async (dispatch) => {
  dispatch({ type: GET_RESOURCE_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/resources`);

    dispatch({
      type: GET_RESOURCE_SUCCESS,
      payload: response.data,
    });
    toast.success("Resource Created Successfully");
  } catch (err) {
    dispatch({
      type: GET_RESOURCE_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
    const message = err.response?.data?.message || err.message;
    toast.error(message);
  }
};

export const getResourcesByType = (type) => async (dispatch) => {
  dispatch({ type: GET_RESOURCE_BY_TYPE_REQUEST });

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/resources/type/${type}`,
    );

    dispatch({
      type: GET_RESOURCE_BY_TYPE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_RESOURCE_BY_TYPE_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const getResourcesBySubject = (subjectId) => async (dispatch) => {
  dispatch({ type: GET_RESOURCE_BY_SUBJECT_REQUEST });

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/resources/subject/${subjectId}`,
    );

    dispatch({
      type: GET_RESOURCE_BY_SUBJECT_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_RESOURCE_BY_SUBJECT_FAILURE,
      payload:
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Failed to fetch resources",
    });
  }
};
export const createResource = (subjectId, resourceData) => async (dispatch) => {
  dispatch({ type: CREATE_RESOURCE_REQUEST });

  try {
    const response = await api.post(
      `/api/resources/subject/${subjectId}`,
      resourceData,
    );

    dispatch({
      type: CREATE_RESOURCE_SUCCESS,
      payload: response.data,
    });
    toast.success("Resource Created Successfully");
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || error.message;

    dispatch({
      type: CREATE_RESOURCE_FAILURE,
      payload: message,
    });
    toast.error(message);
    return { success: false, message };
  }
};
export const deleteResource = (resourceId) => async (dispatch) => {
  dispatch({ type: DELETE_RESOURCE_REQUEST });

  try {
    await api.delete(`/api/resources/${resourceId}`);

    dispatch({
      type: DELETE_RESOURCE_SUCCESS,
      payload: resourceId,
    });
    toast.success("Resource deleted Successfully");
  } catch (err) {
    dispatch({
      type: DELETE_RESOURCE_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
    const message = err.response?.data?.message || err.message;
    toast.error(message);
  }
};
export const updateResource =
  (id, resourceData, subjectId) => async (dispatch) => {
    dispatch({ type: UPDATE_RESOURCE_REQUEST });

    try {
      const url = subjectId
        ? `/api/resources/update/${id}?subjectId=${subjectId}`
        : `/api/resources/update/${id}`;

      const { data } = await api.put(url, resourceData);

      dispatch({
        type: UPDATE_RESOURCE_SUCCESS,
        payload: data,
      });
      toast.success("Resource updated Successfully");
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      dispatch({
        type: UPDATE_RESOURCE_FAILURE,
        payload: message,
      });
      toast.success(message);
      return { success: false, message };
    }
  };
