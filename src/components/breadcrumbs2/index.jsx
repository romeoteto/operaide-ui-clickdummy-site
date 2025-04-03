import { Breadcrumb } from "antd";
import { ChevronRight } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useSelector } from "react-redux";
import { breadcrumbConfig } from "./breadcrumbConfig";
import { getBreadcrumbsFromFlatConfig } from "./getBreadcrumbsFromFlatConfig";
import { blueprints } from "../../database/database";

const Breadcrumbs = () => {
  const [location] = useLocation();

  const currentOrgLabel = useSelector(
    (state) => state.user.currentOrganization?.label
  );

  const { org, breadcrumbs } = getBreadcrumbsFromFlatConfig(
    location,
    breadcrumbConfig,
    {
      org: currentOrgLabel,
      getReaktorLabel: (id) => blueprints.find((b) => b.id === id)?.label || id,
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
        title: clickable && href ? <Link href={href}>{label}</Link> : label,
      }))}
      separator={<ChevronRight size="1em" style={{ height: "100%" }} />}
    />
  );
};

export default Breadcrumbs;
