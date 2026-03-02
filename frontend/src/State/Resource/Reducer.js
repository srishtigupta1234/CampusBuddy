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
  UPDATE_RESOURCE_SUCCESS
} from "./ActionType";

const initialState = {
  resources: [],
  isLoading: false,
  error: null,
};

export const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESOURCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_RESOURCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resources: action.payload,
      };

    case GET_RESOURCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_RESOURCE_BY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_RESOURCE_BY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resources: action.payload,
      };

    case GET_RESOURCE_BY_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    /* -------- BY SUBJECT -------- */

    case GET_RESOURCE_BY_SUBJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_RESOURCE_BY_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resources: action.payload,
      };

    case GET_RESOURCE_BY_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    /* -------- CREATE RESOURCE -------- */

    case CREATE_RESOURCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CREATE_RESOURCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resources: [...state.resources, action.payload], // append new resource
      };

    case CREATE_RESOURCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case DELETE_RESOURCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // Filter out the deleted item from the local state
        resources: state.resources.filter((item) => item.id !== action.payload),
      };

    case DELETE_RESOURCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UPDATE_RESOURCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        resources: state.resources.map((res) =>
          res.id === action.payload.id ? action.payload : res,
        ),
      };

    case UPDATE_RESOURCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
