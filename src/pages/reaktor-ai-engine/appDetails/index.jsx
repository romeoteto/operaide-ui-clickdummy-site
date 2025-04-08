import React from "react";
import { useParams } from "wouter";
import { Flex } from "antd";
import { apps } from "../../../database/apps";

import AppContainer from "./appContainer";
import BlueprintContainer from "./blueprintContainer";

const PageAppDetails = () => {
  const params = useParams();

  const { "app-id": appId } = params;

  const appData = apps.find((app) => app.id === appId);

  return (
    <AppContainer data={appData}>
      <Flex vertical gap="middle">
        {appData.blueprints.map((blueprint) => (
          <BlueprintContainer key={blueprint.id} data={blueprint} />
        ))}
      </Flex>
    </AppContainer>
  );
};

export default PageAppDetails;
