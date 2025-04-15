import { createSlice } from "@reduxjs/toolkit";
import { users, organizations } from "../database/database";
import { getPermissions } from "../helpers";

// Utilities to persist and load from localStorage
const persistState = (state) => {
  localStorage.setItem("userState", JSON.stringify(state));
};

const loadPersistedState = () => {
  try {
    const data = localStorage.getItem("userState");
    return data ? JSON.parse(data) : emptyState;
  } catch (err) {
    console.error("Failed to load persisted state", err);
    return emptyState;
  }
};

// Default (logged-out) state
const emptyState = {
  isLoggedIn: false,
  currentUser: {},
  currentOrganization: {},
  currentPermissions: {},
};

// Load from localStorage or fallback to emptyState
const initialState = loadPersistedState();

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const foundUser = users.find((user) => user.email === action.payload);
      const currentOrganization = organizations.find(
        (org) => org.value === foundUser?.memberships?.[0]?.orgValue
      );

      if (foundUser && currentOrganization) {
        state.currentUser = foundUser;
        state.isLoggedIn = true;
        state.currentOrganization = currentOrganization;
        state.currentPermissions = getPermissions({
          currentUserMemberships: foundUser.memberships,
          currentOrganization,
        });
        persistState(state);
      }
    },

    setCurrentOrganization: (state, action) => {
      const foundOrg = organizations.find(
        (org) => org.value === action.payload
      );

      if (foundOrg) {
        state.currentOrganization = foundOrg;
        state.currentPermissions = getPermissions({
          currentUserMemberships: state.currentUser.memberships,
          currentOrganization: foundOrg,
        });
        persistState(state);
      }
    },

    setBorderRadius: (state, action) => {
      state.currentOrganization.theme.borderRadius = action.payload;
      persistState(state);
    },

    setThemeColor: (state, action) => {
      const { mode, key, value } = action.payload;
      if (
        state.currentOrganization.theme?.[mode] &&
        typeof state.currentOrganization.theme[mode][key] !== "undefined"
      ) {
        state.currentOrganization.theme[mode][key] = value;
        persistState(state);
      }
    },

    setLogout: () => {
      localStorage.removeItem("userState");
      return emptyState;
    },
  },
});

export const {
  setLogin,
  setCurrentOrganization,
  setLogout,
  setBorderRadius,
  setThemeColor,
} = userSlice.actions;

export default userSlice.reducer;
