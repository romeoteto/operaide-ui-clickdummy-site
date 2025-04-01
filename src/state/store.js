import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./appSettingsSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: { appSettings: appSettingsReducer, user: userReducer },
});
