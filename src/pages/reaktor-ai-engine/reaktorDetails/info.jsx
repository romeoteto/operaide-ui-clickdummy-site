import React from "react";
import { Badge, Descriptions } from "antd";

const ReaktorInfo = ({ blueprint, app }) => {
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
      key: "version",
      label: "Version",
      children: blueprint.version,
    },

    {
      key: "status",
      label: "Status",
      children: <Badge status="processing" text="Deployed" />,
      span: 2,
    },
    {
      key: "deployments",
      label: "Number of Deployments",
      children: blueprint.deployments.length,
      span: 1,
    },
    {
      key: "parentAppName",
      label: "Parent App",
      children: app.name,
      span: 2,
    },
    {
      key: "parentAppID",
      label: "Parent App ID",
      children: app.id,
      span: 1,
    },
    {
      key: "parentAppDescription",
      label: "Parent App Description",
      children: app.description,
      span: 3,
    },
  ];
  return <Descriptions size="middle" bordered items={items} column={3} />;
};
export default ReaktorInfo;
