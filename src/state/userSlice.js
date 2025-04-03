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
    return data ? JSON.parse(data) : demoState;
  } catch (err) {
    console.error("Failed to load persisted state", err);
    return demoState;
  }
};

// Default (logged-out) state
const demoState = {
  isLoggedIn: false,
  currentUser: {},
  currentOrganization: {},
  currentPermissions: {},
};

// Development state (optional for dev mode)
const devState = {
  isLoggedIn: true,
  currentUser: users[0],
  currentOrganization: organizations.find(
    (org) => users[0].memberships[0].orgValue === org.value
  ),
  currentPermissions: getPermissions({
    currentUserMemberships: users[0].memberships,
    currentOrganization: organizations.find(
      (org) => users[0].memberships[0].orgValue === org.value
    ),
  }),
};

// Load from localStorage or fallback to demoState
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

        console.log(state);
        persistState(state);
      }
    },

    setLogout: () => {
      localStorage.removeItem("userState");
      return demoState;
    },
  },
});

export const { setLogin, setCurrentOrganization, setLogout } =
  userSlice.actions;

export default userSlice.reducer;
