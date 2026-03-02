import axios from "axios";
import { API_BASE_URL, api } from "../../api/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionType";
import toast from "react-hot-toast";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData,
    );

    const user = response.data;
    console.log(user);

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    dispatch(registerSuccess(user));
    toast.success("User Register Sucessfully");
  } catch (err) {
    if (err.response && err.response.status === 409) {
      toast.error(
        err.response.data.message || "This email is already registered.",
      );
    }

    dispatch(registerFailure(err.response?.data?.message || err.message));
  }
};

/* -------------------- LOGIN -------------------- */

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const { data } = await api.post("/auth/login", userData);
    const user = data;

    // Save token
    const token = user.token || user.jwt;

    if (token) {
      localStorage.setItem("jwt", token);
    }

    dispatch(loginSuccess({ jwt: token }));

    // Fetch full user profile
    dispatch(getUser());

    toast.success("User Logged in successfully");

  } catch (err) {
    const message =
      err.response?.data?.message || err.message;

    dispatch(loginFailure(message));
    toast.error(message);
  }
};
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});
const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await api.get("/api/users/profile");

    dispatch(getUserSuccess(response.data));
  } catch (err) {
    toast.error("Error fetching user profile:", err);
    dispatch(getUserFailure(err.response?.data?.message || err.message));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
  toast.success("User Logged out successfully");
};
