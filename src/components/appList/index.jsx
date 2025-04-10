import React from "react";
import {
  Divider,
  Tooltip,
  List,
  Typography,
  Flex,
  Descriptions,
  Space,
  Button,
  Dropdown,
  theme,
} from "antd";
import { apps } from "../../database/apps";
import { Info, Ellipsis } from "lucide-react";
import { Link, useLocation } from "wouter";
import ReaktorTable from "./reaktorTable";

const { Text, Title } = Typography;
const AppContainer = ({ app }) => {
  const {
    token: {
      paddingXL,
      paddingSM,
      paddingXS,
      colorPrimary,
      colorFillQuaternary,
      marginXS,
      padding,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
      colorBgElevated,
      borderRadiusLG,
      boxShadowSecondary,
    },
  } = theme.useToken();

  const [_, navigate] = useLocation();

  const appActions = [
    {
      key: "1",
      label: <Link>Inspect App</Link>,
    },
    {
      key: "2",
      label: <Link>Download App</Link>,
    },
  ];

  const blueprintActions = [
    {
      key: "1",
      label: <Link>Inspect Reaktor</Link>,
    },
    {
      key: "2",
      label: <Link>Show Diagram</Link>,
    },
  ];

  const deploymentActions = [
    {
      key: "1",
      label: <Link>Inspect Deployment</Link>,
    },
    {
      key: "2",
      label: <Link>Show Metrics</Link>,
    },
    {
      key: "3",
      label: <Link>Show API Endpoints</Link>,
    },
    {
      key: "4",
      label: <Link>Execute Deployment</Link>,
    },
    {
      key: "5",
      label: <Link>Edit Settings</Link>,
    },
  ];
  const contentStyle = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  return <ReaktorTable app={app} />;
};

const AppList = () => (
  <>
    <List
      split={false}
      dataSource={apps}
      renderItem={(app) => (
        <List.Item key={app.id}>
          <AppContainer app={app} />
        </List.Item>
      )}
    />
  </>
);
export default AppList;
