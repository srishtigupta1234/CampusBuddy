import {
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAILURE,
  GET_SUBJECT_BY_ID_REQUEST,
  GET_SUBJECT_BY_ID_SUCCESS,
  GET_SUBJECT_BY_ID_FAILURE,
  GET_SUBJECT_BY_BRANCH_REQUEST,
  GET_SUBJECT_BY_BRANCH_SUCCESS,
  GET_SUBJECT_BY_BRANCH_FAILURE,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILURE,
  UPDATE_SUBJECT_FAILURE,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAILURE,
  DELETE_SUBJECT_REQUEST,
  DELETE_SUBJECT_SUCCESS
} from "./ActionType";

const initialState = {
  subjects: [],
  subject: null,
  isLoading: false,
  error: null,
};

export const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subjects: action.payload,
      };

    case GET_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_SUBJECT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_SUBJECT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subject: action.payload,
      };

    case GET_SUBJECT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_SUBJECT_BY_BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_SUBJECT_BY_BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subjects: action.payload,
      };

    case GET_SUBJECT_BY_BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_SUBJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subjects: [...state.subjects, action.payload], // append new subject
      };

    case CREATE_SUBJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
     case UPDATE_SUBJECT_REQUEST:
case DELETE_SUBJECT_REQUEST:
  return {
    ...state,
    isLoading: true,
    error: null,
  };

case UPDATE_SUBJECT_SUCCESS:
  return {
    ...state,
    isLoading: false,
    subjects: state.subjects.map((sub) =>
      sub.id === action.payload.id ? action.payload : sub
    ),
  };

case DELETE_SUBJECT_SUCCESS:
  return {
    ...state,
    isLoading: false,
    subjects: state.subjects.filter(
      (sub) => sub.id !== action.payload
    ),
  };

case UPDATE_SUBJECT_FAILURE:
case DELETE_SUBJECT_FAILURE:
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
    default:
      return state;
  }
};
