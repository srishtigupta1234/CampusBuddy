// src/State/SGPA/Action.js
import * as types from "./ActionType";
import { api } from "../../api/api"; 


export const getSgpaByUser = () => async (dispatch) => {
  dispatch({ type: types.GET_SGPA_REQUEST });
  try {
    const res = await api.get(`/api/sgpa/user`);
    console.log(res.data);
    dispatch({ type: types.GET_SGPA_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.GET_SGPA_FAILURE, payload: err.message });
  }
};


export const addSgpa = (sgpa) => async (dispatch) => {
  dispatch({ type: types.ADD_SGPA_REQUEST });
  try {
    const res = await api.post(`/api/sgpa`, sgpa);
    dispatch({ type: types.ADD_SGPA_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.ADD_SGPA_FAILURE, payload: err.message });
  }
};


export const updateSgpa = (id, sgpa) => async (dispatch) => {
  dispatch({ type: types.UPDATE_SGPA_REQUEST });
  try {
    const res = await api.put(`/api/sgpa/${id}`, sgpa);
    dispatch({ type: types.UPDATE_SGPA_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.UPDATE_SGPA_FAILURE, payload: err.message });
  }
};


export const deleteSgpa = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_SGPA_REQUEST });
  try {
    await api.delete(`/api/sgpa/${id}`);
    dispatch({ type: types.DELETE_SGPA_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: types.DELETE_SGPA_FAILURE, payload: err.message });
  }
};