import { AnyAction } from "@reduxjs/toolkit";
import {
  SETUP_USER_DATA,
  RESET_USER_DATA,
  UPDATE_USER_DATA,
} from "./userActions";

const initialState = {
  user: "",
  admin: false,
  email: "email",
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SETUP_USER_DATA: {
      return {
        user: action.username,
        admin: action.admin,
        email: action.email,
      };
    }
    case UPDATE_USER_DATA: {
      return {
        ...state,
        email: action.email,
      };
    }
    case RESET_USER_DATA: {
      return {
        username: "",
        admin: false,
        email: "email",
      };
    }
    default:
      return state;
  }
};
