import { useSelector } from "react-redux";
import PageHeader from "../components/pageHeader";
import { Card, Flex, Typography, Row, Col, theme } from "antd";
import { FileText, Users, Store } from "lucide-react";
import { Link } from "wouter";

const { Text, Title } = Typography;

export default function Home() {
  const {
    token: { paddingXS, colorPrimaryBg, colorPrimary },
  } = theme.useToken();

  const label = useSelector((state) => state.user.currentOrganization).label;

  const prename = useSelector((state) => state.user.currentUser.prename);

  return (
    <Flex vertical>
      <PageHeader
        title={`Hi ${prename}!`}
        subtitle={`Welcome to Operaide - your operating system for Agentic Automation at ${label}.`}
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
              <Flex align="center" gap="small">
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    borderRadius: "100%",
                    padding: paddingXS,
                    background: colorPrimaryBg,
                  }}
                >
                  <FileText size="1.25em" style={{ color: colorPrimary }} />
                </Flex>
                <Text>Read the documentation</Text>
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
              <Flex align="center" gap="small">
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    borderRadius: "100%",
                    padding: paddingXS,
                    background: colorPrimaryBg,
                  }}
                >
                  <Users size="1.25em" style={{ color: colorPrimary }} />
                </Flex>
                <Text>Meet with the community</Text>
              </Flex>
            </Card>
          </a>
        </Col>
        <Col span={8}>
          <Link href="/app-store">
            <Card hoverable>
              <Flex align="center" gap="small">
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    borderRadius: "100%",
                    padding: paddingXS,
                    background: colorPrimaryBg,
                  }}
                >
                  <Store size="1.25em" style={{ color: colorPrimary }} />
                </Flex>
                <Text>Visit the App Store</Text>
              </Flex>
            </Card>
          </Link>
        </Col>
      </Row>
    </Flex>
  );
}
