import { useSelector } from "react-redux";
import PageHeader from "../components/pageHeader";
import { Card, Flex, Space, Typography, Row, Col, Avatar, theme } from "antd";
import { FileText, Users, Store, Boxes } from "lucide-react";
import { Link } from "wouter";

const { Text, Title } = Typography;

export default function Home() {
  const {
    token: { paddingXS, colorPrimaryBg, colorPrimary },
  } = theme.useToken();

  const label = useSelector((state) => state.user.currentOrganization).label;
  const currentPermissions = useSelector(
    (state) => state.user.currentPermissions
  );
  const userIsSuperAdmin = useSelector(
    (state) => state.user.currentUser.isSuperAdmin
  );

  const prename = useSelector((state) => state.user.currentUser.prename);

  const canSeeExternalLinks =
    userIsSuperAdmin || currentPermissions.org.externalLinks.length > 0;

  const canSeeAppStore =
    userIsSuperAdmin || currentPermissions.org.appStore.length > 0;

  const canSeeApps =
    userIsSuperAdmin || currentPermissions.org.apps.includes("canViewApps");

  return (
    <Flex vertical>
      <PageHeader
        title={`Hi ${prename}!`}
        subtitle={`Welcome to Operaide - your operating system for Agentic Automation at ${label}.`}
      />

      <Title level={4}>Get started</Title>
      <Row justify="start" gutter={[24, 24]}>
        {canSeeExternalLinks && (
          <>
            <Col span={8}>
              <a
                href="https://staging.demo.operaide.ai/op-docs/docs/overview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card size="middle" hoverable>
                  <Space>
                    <Avatar
                      icon={<FileText size="1em" />}
                      style={{
                        background: colorPrimaryBg,
                        color: colorPrimary,
                      }}
                    />

                    <Text>Read the documentation</Text>
                  </Space>
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
                  <Space>
                    <Avatar
                      icon={<Users size="1em" />}
                      style={{
                        background: colorPrimaryBg,
                        color: colorPrimary,
                      }}
                    />
                    <Text>Meet with the community</Text>
                  </Space>
                </Card>
              </a>
            </Col>
          </>
        )}

        {canSeeAppStore && (
          <Col span={8}>
            <Link href="/store">
              <Card hoverable>
                <Space>
                  <Avatar
                    icon={<Store size="1em" />}
                    style={{ background: colorPrimaryBg, color: colorPrimary }}
                  />
                  <Text>Visit the App Store</Text>
                </Space>
              </Card>
            </Link>
          </Col>
        )}
        {canSeeApps && (
          <Col span={8}>
            <Link href="/reaktor-ai-engine/apps">
              <Card hoverable>
                <Space>
                  <Avatar
                    icon={<Boxes size="1em" />}
                    style={{ background: colorPrimaryBg, color: colorPrimary }}
                  />
                  <Text>Check out Your Apps</Text>
                </Space>
              </Card>
            </Link>
          </Col>
        )}
      </Row>
    </Flex>
  );
}
