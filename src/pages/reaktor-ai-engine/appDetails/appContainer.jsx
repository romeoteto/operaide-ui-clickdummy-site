import React from "react";
import {
  Button,
  Descriptions,
  Divider,
  Flex,
  Tag,
  Typography,
  theme,
} from "antd";
import { Download } from "lucide-react";

import DynamicSVG from "../../../assets/reaktor-images/dynamicSVG";

const { Title, Text } = Typography;

const AppContainer = ({ data, children }) => {
  const {
    imageSrc,
    name,
    description,
    id,
    version,
    categories,
    expectedOperaideVersion,
  } = data;

  const {
    token: {
      paddingXL,
      paddingSM,
      colorPrimary,
      colorFillQuaternary,
      marginXS,
      padding,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
    },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      label: "ID",
      children: id,
    },
    {
      key: "2",
      label: "Version",
      children: version,
    },
    {
      key: "3",
      label: "Categories",
      children: (
        <Flex wrap>
          {categories.map((category) => (
            <Tag
              color="geekblue"
              key={category}
              style={{ marginBottom: marginXS }}
            >
              {category}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      key: "4",
      label: "Expected Operaide Version",
      children: expectedOperaideVersion,
    },
  ];
  return (
    <div
      style={{
        borderRadius,
        border: `${lineWidth}px solid ${colorBorderSecondary}`,
      }}
    >
      <Flex
        gap="large"
        style={{
          background: colorFillQuaternary,
          padding: paddingSM,
          borderBottom: `${lineWidth}px solid ${colorBorderSecondary}`,
        }}
      >
        {/*     <div
          style={{
            width: "180px",
            height: "180px",
            padding: paddingXL,
            flexShrink: 0,
            borderRadius: borderRadius,
            border: `${lineWidth}px solid ${colorBorderSecondary}`,
            background: colorFillQuaternary,
          }}
        >
          <DynamicSVG src={imageSrc} fillColor={colorPrimary} />
        </div> */}
        <Flex vertical gap="large">
          <Flex vertical>
            <Title level={3}>{name}</Title>
            <Text>{description}</Text>
          </Flex>

          <Descriptions size="small" items={items} column={2} />
        </Flex>
        <Button
          size="small"
          color="default"
          variant="filled"
          icon={<Download size="1em" />}
        >
          Download
        </Button>
      </Flex>

      <div style={{ padding: paddingSM }}>{children}</div>
    </div>
  );
};

export default AppContainer;
