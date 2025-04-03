import { createSlice } from "@reduxjs/toolkit";
import { users, organizations, orgRoles } from "../database/database";
import { getPermissions } from "../helpers";

const demoState = {
  isLoggedIn: false,
  currentUser: {},
  currentOrganization: {},
  currentPermissions: {},
  /** add global permissions and org permissions */
};

//state for development
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
  /** add global permissions and org permissions */
};
//state for development

const initialState = devState; //switch for development

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const foundUser = users.find((user) => user.email === action.payload);
      const currentOrganization = organizations.find(
        (org) => org.value === foundUser.memberships[0].orgValue
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isLoggedIn = true;
        state.currentOrganization = currentOrganization;
        state.currentPermissions = getPermissions({
          currentUserMemberships: foundUser.memberships,
          currentOrganization,
        });
        /** add global permissions and org permissions */
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
        /** add global permissions and org permissions */
      }
    },

    setLogout: () => initialState,
  },
});

export const { setLogin, setCurrentOrganization, setLogout } =
  userSlice.actions;

export default userSlice.reducer;
