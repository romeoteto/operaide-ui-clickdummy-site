import { Flex, Typography, Tag, Image, Space, theme } from "antd";
import { Link } from "wouter";

const { Text } = Typography;

export default function InfoPanel({
  label,
  description,
  type,
  version,
  id,
  parentId,
}) {
  const {
    token: { padding, lineWidth, colorBorderSecondary, borderRadius },
  } = theme.useToken();
  return (
    <Flex
      style={{
        padding: padding,
        border: `${lineWidth}px solid ${colorBorderSecondary}`,
        borderRadius: borderRadius,
      }}
    >
      <Flex vertical gap="small">
        <Flex vertical>
          <Text type="secondary">Label</Text>
          <Text strong>{label}</Text>
        </Flex>

        <Flex vertical>
          <Text type="secondary">Description</Text>
          <Text>{description}</Text>
        </Flex>

        <Flex gap="large">
          <Flex vertical>
            <Text type="secondary">Type</Text>
            <Text strong>{type}</Text>
          </Flex>
          <Flex vertical>
            <Text type="secondary">Version</Text>
            <Text strong>{version}</Text>
          </Flex>
          <Flex vertical>
            <Text type="secondary">ID</Text>
            <Text strong>{id}</Text>
          </Flex>

          {parentId && (
            <Flex vertical>
              <Text type="secondary">Blueprint ID</Text>{" "}
              <Text strong>
                <Link href={`/reaktor-ai-engine/${parentId}`}>{parentId}</Link>
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
