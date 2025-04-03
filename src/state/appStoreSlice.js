import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appInstallVisible: false,
  appToBeInstalled: {},
};

export const appStoreSlice = createSlice({
  name: "appStore",
  initialState,
  reducers: {
    setAppInstallVisible: (state, action) => {
      state.appInstallVisible = action.payload;
    },
    setAppToBeInstalled: (state, action) => {
      state.appToBeInstalled = action.payload.item;
    },
  },
});

export const { setAppInstallVisible, setAppToBeInstalled } =
  appStoreSlice.actions;

export default appStoreSlice.reducer;
