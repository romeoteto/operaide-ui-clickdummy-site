import { useState } from "react";
import { Flex, Tag, Card, theme } from "antd";

const { Meta } = Card;

export default function ReaktorCard({
  label,
  description,
  imageSrc,
  official,
}) {
  const [hovered, setHovered] = useState(false);

  const {
    token: {
      paddingSM,
      paddingLG,
      colorPrimary,
      colorTextBase,
      cardWidth,
      lineWidth,
      colorBorderSecondary,
      colorBgLayout,
    },
  } = theme.useToken();

  const Cover = () => {
    return (
      <Flex
        vertical
        style={{
          border: `${lineWidth}px solid ${
            hovered ? "transparent" : colorBorderSecondary
          }`,
          backgroundColor: colorBgLayout,
          borderBottom: 0,
          transition: "border-color 0.3s ease",
        }}
      >
        <Flex
          style={{
            padding: paddingSM,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Tag
            bordered={false}
            color={official ? colorPrimary : colorTextBase}
            style={{ margin: 0 }}
          >
            {official ? "Operaide Team" : "Community"}
          </Tag>
        </Flex>
        <Flex style={{ padding: paddingLG, height: "200px" }}>
          <img src={imageSrc} style={{ width: "100%" }} />
        </Flex>
      </Flex>
    );
  };

  return (
    <Card
      hoverable
      style={{ width: cardWidth }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      cover={<Cover />}
    >
      <Meta
        title={label}
        description={description}
        style={{ height: "99px" }}
      />
    </Card>
  );
}
