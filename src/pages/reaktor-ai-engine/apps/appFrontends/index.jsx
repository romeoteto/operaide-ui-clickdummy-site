import React from "react";
import { useRoute, useLocation } from "wouter";
import { frontendMap } from "../../../../database/apps";
import { apps } from "../../../../database/apps";
import PageHeader from "../../../../components/pageHeader";
import { Fullscreen } from "lucide-react";
import { Button, Flex } from "antd";

const NotFound = () => {
  return <div>Not Found</div>;
};

const AppFrontends = () => {
  const [match, params] = useRoute("/reaktor-ai-engine/apps/:appId");
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
        <Button
          variant="dashed"
          color="default"
          type="link"
          icon={<Fullscreen size="1em" />}
          href={`/app/ext/${appId}`}
          rel="noopener noreferrer"
          target="_blank"
        />
      </Flex>

      <FrontendComponent app={app} />
    </>
  );
};

export default AppFrontends;
