import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { blueprints } from "../database/database";
import PageHeader from "../components/pageHeader";
import { LayoutDashboard, CircleGauge, Cloud, Settings2 } from "lucide-react";
import TabNav from "../components/tabNav";
import { Flex, Typography, Table, Tag, Image, Input, Button } from "antd";
import InfoPanel from "../components/infoPanel";

export default function DeploymentDetails() {
  const params = useParams();
  const [activeKey, setActiveKey] = useState(0);

  const [location, navigate] = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location]);

  const { "reaktor-id": reaktorId, "deployment-id": deploymentId } = params;

  const blueprint = blueprints.find((bp) => bp.id === reaktorId);
  const deployment = blueprint.deployments.find(
    (deployment) => deployment.id === deploymentId
  );

  const tabs = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      href: `/reaktor-ai-engine/${reaktorId}/${deploymentId}/overview`,
    },
    {
      icon: CircleGauge,
      label: "Metrics",
      href: `/reaktor-ai-engine/${reaktorId}/${deploymentId}/metrics`,
    },
    {
      icon: Cloud,
      label: "API",
      href: `/reaktor-ai-engine/${reaktorId}/${deploymentId}/api`,
    },
    {
      icon: Settings2,
      label: "Settings",
      href: `/reaktor-ai-engine/${reaktorId}/${deploymentId}/settings`,
    },
  ];

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  return (
    <div>
      <PageHeader title={deployment.label} />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      {activeKey === 0 && (
        <InfoPanel
          id={deployment.id}
          label={deployment.label}
          description={deployment.description}
          type="Deployment"
          version={deployment.version}
          group={deployment.group}
          tags={deployment.tags}
          imageSrc={deployment.imageSrc}
          parentId={blueprint.id}
        />
      )}
    </div>
  );
}
