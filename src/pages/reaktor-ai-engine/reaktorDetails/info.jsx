import React from "react";
import { Badge, Descriptions } from "antd";

const ReaktorInfo = ({ blueprint, app }) => {
  const isDeployed = blueprint.deployments.length > 0;
  const items = [
    {
      key: "type",
      label: "Type",
      children: "Reaktor",
    },
    {
      key: "id",
      label: "ID",
      children: blueprint.id,
    },

    {
      key: "status",
      label: "Status",
      children: (
        <Badge
          status={isDeployed ? "processing" : "default"}
          text={isDeployed ? "Deployed" : "Not Deployed"}
        />
      ),
    },
    {
      key: "deployments",
      label: "Number of Deployments",
      children: blueprint.deployments.length,
    },
    {
      key: "parentAppName",
      label: "Parent App",
      children: app.name,
    },
    {
      key: "parentAppID",
      label: "Parent App ID",
      children: app.id,
    },
    {
      key: "parentAppDescription",
      label: "Parent App Description",
      children: app.description,
      span: 3,
    },
  ];
  return <Descriptions size="middle" bordered items={items} column={2} />;
};
export default ReaktorInfo;
