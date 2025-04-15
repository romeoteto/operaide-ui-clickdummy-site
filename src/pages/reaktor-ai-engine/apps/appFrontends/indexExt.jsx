import React from "react";
import { useRoute, useLocation } from "wouter";
import { frontendMap } from "../../../../database/apps";
import { apps } from "../../../../database/apps";
import PageHeader from "../../../../components/pageHeader";
import { Flex } from "antd";

const NotFound = () => {
  return <div>Not Found</div>;
};

const AppFrontendsExt = () => {
  const [match, params] = useRoute("/app/ext/:appId");
  const [_, navigate] = useLocation();

  if (!match) return <NotFound />;

  const { appId } = params;
  const FrontendComponent = frontendMap[appId];
  const app = apps.find((app) => app.id === appId);

  if (!FrontendComponent) {
    return <NotFound />;
  }

  return (
    <>
      <Flex justify="space-between">
        <PageHeader title={app.name} subtitle={app.description} />
      </Flex>

      <FrontendComponent app={app} />
    </>
  );
};

export default AppFrontendsExt;
