import { createSlice } from "@reduxjs/toolkit";
import { users, organizations } from "../database";

const initialState = {
  isLoggedIn: false,
  currentUser: {},
  currentOrganization: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const foundUser = users.find((user) => user.email === action.payload);
      if (foundUser) {
        state.currentUser = foundUser;
        state.isLoggedIn = true;
        state.currentOrganization = organizations.find(
          (org) => org.value === foundUser.memberships[0].orgValue
        );
      }
    },

    setCurrentOrganization: (state, action) => {
      const foundOrg = organizations.find(
        (org) => org.value === action.payload
      );
      if (foundOrg) {
        state.currentOrganization = foundOrg;
      }
    },

    setLogout: () => initialState,
  },
});

export const { setLogin, setCurrentOrganization, setLogout } =
  userSlice.actions;

export default userSlice.reducer;
