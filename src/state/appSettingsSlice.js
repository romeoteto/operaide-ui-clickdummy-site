import { createSlice } from "@reduxjs/toolkit";
import { organizations, accentColors } from "../database";

const initialState = {
  currentOrganization: organizations[0],
  appearance: "system",
  accentColor: accentColors[0],
  userIsLoggedIn: true,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setOrganization: (state, action) => {
      const foundOrg = organizations.find(
        (org) => org.value === action.payload
      );
      if (foundOrg) {
        state.currentOrganization = foundOrg;
      }
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
  },
});

export const { setOrganization, setAccentColor, setAppearance } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
