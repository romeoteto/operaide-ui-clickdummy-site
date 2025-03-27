import { Breadcrumb } from "antd";
import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { blueprints } from "../database";

const routeNameMap = {
  "": "Home",
  "reaktor-ai-engine": "Reaktor AI Engine",
  "data-studio": "Data Studio",
  documents: "Documents",
  "document-groups": "Document Groups",
  "vector-db": "Vector DB",
  integrations: "Integrations",
  "ai-provider": "AI Provider",
  services: "Services",
  settings: "Settings",
};

const dynamicNameMap = {
  "reaktor-ai-engine": (id) =>
    blueprints.find((blueprint) => blueprint.id === id).label,
  [":reaktor-id"]: (id) => `${id}`,
  [":deployment-id"]: (id) => `${id}`,
};

const Breadcrumbs = () => {
  const [location] = useLocation();
  const pathSnippets = location.split("/").filter(Boolean);

  if (pathSnippets.length < 2) {
    return null;
  }

  const breadcrumbItems = [];
  let accumulatedPath = "";

  pathSnippets.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    const prevSegment = pathSnippets[index - 1];

    // If previous segment has a dynamic name formatter
    let title;
    if (dynamicNameMap[prevSegment]) {
      title = dynamicNameMap[prevSegment](segment);
    } else {
      title = routeNameMap[segment] || segment;
    }

    breadcrumbItems.push({
      title:
        index === pathSnippets.length - 1 ? (
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
