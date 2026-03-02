// src/State/SGPA/Reducer.js
import * as types from "./ActionType";

const initialState = {
  sgpaList: [],
  loading: false,
  error: null,
};

const sgpaReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------- GET ----------------
    case types.GET_SGPA_REQUEST:
      return { ...state, loading: true, error: null };
    case types.GET_SGPA_SUCCESS:
      return { ...state, loading: false, sgpaList: action.payload };
    case types.GET_SGPA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ---------------- ADD ----------------
    case types.ADD_SGPA_REQUEST:
      return { ...state, loading: true, error: null };
    case types.ADD_SGPA_SUCCESS:
      return { ...state, loading: false, sgpaList: [...state.sgpaList, action.payload] };
    case types.ADD_SGPA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ---------------- UPDATE ----------------
    case types.UPDATE_SGPA_REQUEST:
      return { ...state, loading: true, error: null };
    case types.UPDATE_SGPA_SUCCESS:
      return {
        ...state,
        loading: false,
        sgpaList: state.sgpaList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case types.UPDATE_SGPA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ---------------- DELETE ----------------
    case types.DELETE_SGPA_REQUEST:
      return { ...state, loading: true, error: null };
    case types.DELETE_SGPA_SUCCESS:
      return {
        ...state,
        loading: false,
        sgpaList: state.sgpaList.filter((item) => item.id !== action.payload),
      };
    case types.DELETE_SGPA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default sgpaReducer;
