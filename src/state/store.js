import { configureStore } from '@reduxjs/toolkit'
import appSettingsReducer from './appSettingsSlice'

export const store = configureStore({
  reducer: {appSettings: appSettingsReducer},
})