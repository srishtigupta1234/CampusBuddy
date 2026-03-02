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

const initialState = {
  branch: null, // single branch
  branches: [], // all branches
  isLoading: false,
  error: null,
};

export const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANCH_BY_ID_REQUEST:
    case GET_BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_BRANCH_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branch: action.payload,
      };

    case GET_BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branches: action.payload,
      };

    case GET_BRANCH_BY_ID_FAILURE:
    case GET_BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CREATE_BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branches: [...state.branches, action.payload], // add new branch
      };

    case CREATE_BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case DELETE_BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case DELETE_BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branches: state.branches.filter(
          (branch) => branch.id !== action.payload,
        ),
      };

    case DELETE_BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case UPDATE_BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branches: state.branches.map((branch) =>
          branch.id === action.payload.id ? action.payload : branch,
        ),
      };

    case UPDATE_BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
