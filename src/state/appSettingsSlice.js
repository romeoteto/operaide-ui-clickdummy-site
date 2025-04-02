import { createSlice } from "@reduxjs/toolkit";
import { organizations, accentColors } from "../database";

const initialState = {
  appearance: "system",
  accentColor: accentColors[0],
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
  },
});

export const { setAccentColor, setAppearance } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
