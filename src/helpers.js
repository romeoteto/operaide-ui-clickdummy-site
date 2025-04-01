import { organizations } from "./database";

export function getOrganizationsByMemberships(memberships) {
  return memberships
    .map((membership) =>
      organizations.find((org) => org.value === membership.orgValue)
    )
    .filter(Boolean); // Filter out any unmatched orgs (just in case)
}

export function indicateIfUserIsAdminInCurrentOrganization({
  memberships,
  currentOrganization,
}) {
  const membershipsInCurrentOrganization = memberships
    .find((membership) => membership.orgValue === currentOrganization.value)
    .roleValues.map((roleValue) => roleValue);

  const isOrgAdmin = membershipsInCurrentOrganization.includes(1);
  return isOrgAdmin;
}
