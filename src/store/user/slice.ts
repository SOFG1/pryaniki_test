import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./types";

const initialState: IUserState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;

export const userReducer = userSlice.reducer;