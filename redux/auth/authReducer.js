import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
  },
  reducers: {},
});
