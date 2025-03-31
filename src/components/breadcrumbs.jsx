import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { blueprints } from "../database";

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
  themes: "Themes",
  overview: "Overview",
  diagram: "Diagram",
  "default-settings": "Default Settings",
  deployments: "Deployments",
  metrics: "Metrics",
  api: "API",
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

const Breadcrumbs = () => {
  const [location] = useLocation();
  const pathSnippets = location.split("/").filter(Boolean);

  const currentOrgLabel = useSelector(
    (state) => state.appSettings.currentOrganization
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
    let isNonClickable = nonClickableSegments.includes(segment);

    // Reaktor path special logic
    const isReaktorPath = pathSnippets[0] === "reaktor-ai-engine";

    if (isReaktorPath) {
      const hasThirdSegment = pathSnippets.length >= 3;
      const thirdSegment = pathSnippets[2];

      const isOverviewOrOtherStatic = [
        "overview",
        "diagram",
        "default-settings",
        "deployments",
      ].includes(thirdSegment);

      if (index === 1) {
        // reaktor-id
        // only clickable if next segment is a deployment ID
        if (!hasThirdSegment || isOverviewOrOtherStatic) {
          isNonClickable = true;
        }
      }

      if (index === 2) {
        // deployment-id is always non-clickable
        isNonClickable = true;
      }
    }

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
