import { AnyAction } from "@reduxjs/toolkit";

export const SETUP_USER_DATA = "SETUP_USER_DATA";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const RESET_USER_DATA = "RESET_USER_DATA";

export const setupUserDataAction = (
  username: string,
  admin: boolean,
  email: string
): AnyAction => ({
  type: SETUP_USER_DATA,
  username,
  admin,
  email,
});

export const updateUserDataAction = (email: string): AnyAction => ({
  type: UPDATE_USER_DATA,
  email,
});

export const resetUserDataAction: AnyAction = {
  type: RESET_USER_DATA,
};
