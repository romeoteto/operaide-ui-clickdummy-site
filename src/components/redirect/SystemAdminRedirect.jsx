import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "wouter";

const systemAdminRoutes = [
  { path: "/system-admin/organizations", permission: "canViewOrganizations" },
  { path: "/system-admin/all-users", permission: "canViewUsers" },
  { path: "/system-admin/migrations", permission: "canViewMigrations" },
  { path: "/system-admin/permissions", permission: "canViewPermissions" },
];

const SystemAdminRedirect = () => {
  const isSuperAdmin = useSelector(
    (state) => state.user.currentUser.isSuperAdmin
  );
  const currentPermissions = useSelector(
    (state) => state.user.currentPermissions
  ).global.systemAdmin;

  const firstAllowed = isSuperAdmin
    ? systemAdminRoutes[0]
    : systemAdminRoutes.find((route) =>
        currentPermissions.includes(route.permission)
      );

  if (firstAllowed) {
    return <Redirect to={firstAllowed.path} />;
  }

  return <Redirect to="/no-access" />;
};

export default SystemAdminRedirect;
