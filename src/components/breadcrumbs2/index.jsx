import { Breadcrumb, Dropdown } from "antd";
import { ChevronRight } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useSelector } from "react-redux";
import { breadcrumbConfig } from "./breadcrumbConfig";
import { getBreadcrumbsFromFlatConfig } from "./getBreadcrumbsFromFlatConfig";
import { apps } from "../../database/apps";

const Breadcrumbs = () => {
  const [location] = useLocation();

  const currentOrgLabel = useSelector(
    (state) => state.user.currentOrganization?.label
  );

  const getAppLabel = (appId) => {
    const app = apps.find((a) => a.id === appId);
    return app?.name || appId;
  };

  const getBlueprintLabel = (appId, reaktorId) => {
    const app = apps.find((a) => a.id === appId);
    const blueprint = app?.blueprints?.find((bp) => bp.id === reaktorId);
    return blueprint?.label || reaktorId;
  };

  const getDeploymentLabel = (appId, reaktorId, deploymentId) => {
    const app = apps.find((a) => a.id === appId);
    const blueprint = app?.blueprints?.find((bp) => bp.id === reaktorId);
    const deployment = blueprint?.deployments?.find(
      (d) => d.id === deploymentId
    );
    return deployment?.label || deploymentId;
  };

  const { org, breadcrumbs } = getBreadcrumbsFromFlatConfig(
    location,
    breadcrumbConfig,
    {
      org: currentOrgLabel,
      getAppLabel,
      getBlueprintLabel,
      getDeploymentLabel,
    }
  );

  const fullBreadcrumbs = [
    ...(org.show && currentOrgLabel
      ? [
          {
            label: currentOrgLabel,
            href: "/",
            clickable: org.clickable !== false,
          },
        ]
      : []),
    ...breadcrumbs,
  ];

  return (
    <Breadcrumb
      items={fullBreadcrumbs.map(({ label, href, clickable }) => ({
        title: clickable ? <Link href={href}>{label}</Link> : label,
      }))}
      separator={<ChevronRight size="1em" style={{ height: "100%" }} />}
    />
  );
};

export default Breadcrumbs;
