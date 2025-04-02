import { organizations, orgRoles } from "./database";

export function getOrganizationsByMemberships(memberships) {
  return memberships
    .map((membership) =>
      organizations.find((org) => org.value === membership.orgValue)
    )
    .filter(Boolean); // Filter out any unmatched orgs (just in case)
}

export function getPermissions({
  currentUserMemberships,
  currentOrganization,
}) {
  const currentMembership = currentUserMemberships.find(
    (membership) => membership.orgValue === currentOrganization.value
  );

  const currentOrgRole = orgRoles.find(
    (orgRole) => orgRole.value === currentMembership.roleValue
  );

  return currentOrgRole.permissions;
}
