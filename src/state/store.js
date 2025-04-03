import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./appSettingsSlice";
import userReducer from "./userSlice";
import appStoreReducer from "./appStoreSlice";
import installedAppsReducer from "./installedAppsSlice";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    user: userReducer,
    appStore: appStoreReducer,
    installedApps: installedAppsReducer,
  },
});
