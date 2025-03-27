import { Typography, Flex, theme } from "antd";

const { Title, Text } = Typography;

export default function PageHeader({ title, subtitle }) {
  const {
    token: { margin, marginLG },
  } = theme.useToken();

  return (
    <Flex vertical>
      <Title level={3}>{title}</Title>
      {subtitle && (
        <div style={{ maxWidth: "500px", marginBottom: marginLG }}>
          <Text>{subtitle}</Text>
        </div>
      )}
    </Flex>
  );
}
