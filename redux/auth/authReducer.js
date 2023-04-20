import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickName: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      photo: payload.photo,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
  },
});
