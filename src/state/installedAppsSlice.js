import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apps: [], //add here a default state with some orgs and apps
};

export const installedAppsSlice = createSlice({
  name: "installedApps",
  initialState,
  reducers: {
    installApp: (state, action) => {
      state.apps = [...state.apps, action.payload];
    },
  },
});

export const { installApp } = installedAppsSlice.actions;

export default installedAppsSlice.reducer;
