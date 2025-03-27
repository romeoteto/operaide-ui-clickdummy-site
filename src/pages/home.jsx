import PageHeader from "../components/pageHeader";
import { Card, Flex, Typography, Row, Col, theme } from "antd";
import { FileText, ExternalLink, Users } from "lucide-react";

const { Text, Title } = Typography;

export default function Home() {
  const {
    token: { paddingXS, colorPrimaryBg },
  } = theme.useToken();
  return (
    <Flex vertical>
      <PageHeader
        title="Hi Oliver!"
        subtitle="Welcome to Operaide - your operating system for Agentic Automation at objective partner."
      />

      <Title level={4}>Get started</Title>
      <Row justify="start" gutter={24}>
        <Col span={8}>
          <a
            href="https://staging.demo.operaide.ai/op-docs/docs/overview/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card size="middle" hoverable>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap="small">
                  <Flex
                    justify="center"
                    align="center"
                    style={{
                      borderRadius: "500px",
                      padding: paddingXS,
                      background: colorPrimaryBg,
                    }}
                  >
                    <FileText size="1.25em" />
                  </Flex>
                  <Text>Read the documentation</Text>
                </Flex>

                <ExternalLink size="1.25em" />
              </Flex>
            </Card>
          </a>
        </Col>
        <Col span={8}>
          <a
            href="https://operaide.bettermode.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card hoverable>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap="small">
                  <Flex
                    justify="center"
                    align="center"
                    style={{
                      borderRadius: "500px",
                      padding: paddingXS,
                      background: colorPrimaryBg,
                    }}
                  >
                    <Users size="1.25em" />
                  </Flex>
                  <Text>Meet with others in the community</Text>
                </Flex>

                <ExternalLink size="1.25em" />
              </Flex>
            </Card>
          </a>
        </Col>
      </Row>
    </Flex>
  );
}
