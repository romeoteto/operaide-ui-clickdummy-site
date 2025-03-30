import { Breadcrumb } from "antd";
import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { blueprints } from "../database";
import { organizations } from "../utils";

const routeNameMap = {
  "reaktor-ai-engine": "Reaktor AI Engine",
  "data-studio": "Data Studio",
  documents: "Documents",
  "document-groups": "Document Groups",
  "vector-db": "Vector DB",
  integrations: "Integrations",
  "ai-provider": "AI Provider",
  services: "Services",
  settings: "Settings",
  "system-admin": "System Admin",
  organizations: "Organizations",
  "all-users": "All Users",
  migrations: "Migrations",
  permissions: "Permissions",
  general: "General",
  members: "Members",
  registration: "Registration",
  "api-keys": "API Keys",
};

const dynamicNameMap = {
  "reaktor-ai-engine": (id) =>
    blueprints.find((blueprint) => blueprint.id === id).label,
  [":reaktor-id"]: (id) => `${id}`,
  [":deployment-id"]: (id) => `${id}`,
};

const nonClickableSegments = [
  "data-studio",
  "integrations",
  "system-admin",
  "settings",
  // add more segments here that shouldn't be clickable
];

const Breadcrumbs = ({ currentOrganization }) => {
  const [location] = useLocation();
  const pathSnippets = location.split("/").filter(Boolean);

  const currentOrgLabel = organizations.find(
    (organization) => organization.value === currentOrganization
  ).label;

  const breadcrumbItems = [];

  const isHome = pathSnippets.length === 0;
  const isSystemAdmin = pathSnippets[0] === "system-admin";

  // Show currentOrgLabel (as plain text on home, as link otherwise)
  if (!isSystemAdmin) {
    breadcrumbItems.push({
      title: isHome ? (
        currentOrgLabel
      ) : (
        <Link href={`/`}>{currentOrgLabel}</Link>
      ),
    });
  }

  // If it's just home, return now with only the org label
  if (isHome) {
    return (
      <Breadcrumb
        items={breadcrumbItems}
        separator={<ChevronRight size="1em" style={{ height: "100%" }} />}
      />
    );
  }

  let accumulatedPath = "";

  pathSnippets.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    const prevSegment = pathSnippets[index - 1];

    let title;
    if (dynamicNameMap[prevSegment]) {
      title = dynamicNameMap[prevSegment](segment);
    } else {
      title = routeNameMap[segment] || segment;
    }

    const isLast = index === pathSnippets.length - 1;
    const isNonClickable = nonClickableSegments.includes(segment);

    breadcrumbItems.push({
      title:
        isLast || isNonClickable ? (
          title
        ) : (
          <Link href={accumulatedPath}>{title}</Link>
        ),
    });
  });

  return (
    <Breadcrumb
      items={breadcrumbItems}
      separator={<ChevronRight size="1em" style={{ height: "100%" }} />}
    />
  );
};

export default Breadcrumbs;
