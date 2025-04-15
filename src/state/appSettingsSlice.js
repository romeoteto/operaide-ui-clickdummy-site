import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appearance: "light",
  resolvedAppearance: "light", // the actual resolved value
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
    setResolvedAppearance(state, action) {
      state.resolvedAppearance = action.payload;
    },
  },
});

export const { setAppearance, setResolvedAppearance } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
