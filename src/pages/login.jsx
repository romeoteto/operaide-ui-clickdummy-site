import { Flex, Typography, Button, Form, Input, Row, Col, theme } from "antd";
import signet from "../assets/signet-light.svg";

import { Mail, Lock } from "lucide-react";

const { Title } = Typography;

export default function PageLogin({ onFinish }) {
  const {
    token: {
      colorBgContainer,
      colorBgLayout,
      paddingLG,
      borderRadius,
      colorBorderSecondary,
      lineWidth,
    },
  } = theme.useToken();

  return (
    <Flex
      justify="center"
      align="center"
      vertical
      gap="large"
      style={{
        backgroundColor: colorBgLayout,
        width: "100%",
        height: "100vh",
        padding: paddingLG,
      }}
    >
      <img alt="signet" src={signet} style={{ height: "100px" }} />
      <Row style={{ width: "100%" }} justify="center">
        <Col
          xs={24} // full width on phones
          sm={20}
          md={16}
          lg={10}
          xl={8}
        >
          <Flex
            vertical
            align="center"
            style={{
              padding: paddingLG,
              backgroundColor: colorBgContainer,
              border: `${lineWidth}px solid ${colorBorderSecondary}`,
              borderRadius,
              width: "100%", // important for Col to manage the size
            }}
          >
            <Title level={3}>Login</Title>

            <Form
              name="signup"
              onFinish={() => onFinish()}
              layout="vertical"
              style={{ width: "100%" }}
            >
              <Form.Item label="E-Mail" name="email">
                <Input size="large" prefix={<Mail size="1em" />} />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input
                  size="large"
                  type="password"
                  prefix={<Lock size="1em" />}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
