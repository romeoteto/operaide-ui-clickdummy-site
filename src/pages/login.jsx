import { useDispatch } from "react-redux";
import { setLogin } from "../state/userSlice";

import { Flex, Typography, Button, Form, Input, Row, Col, theme } from "antd";

import { Mail, Lock } from "lucide-react";
import LoginForm from "../components/loginForm";

const { Title, Text } = Typography;

export default function PageLogin() {
  const {
    token: {
      colorBgContainer,
      colorBgLayout,
      paddingLG,
      borderRadius,
      colorBorderSecondary,
      lineWidth,
      signet,
      margin,
      fontSizeSM,
    },
  } = theme.useToken();

  const dispatch = useDispatch();
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

            <LoginForm />
          </Flex>
        </Col>
      </Row>
      <Text
        style={{
          position: "absolute",
          bottom: margin,
          fontSize: fontSizeSM,
          textAlign: "center",
        }}
      >
        Senseca AI Platform powered by <br></br>© Operaide{" "}
        {new Date().getFullYear()}
      </Text>
    </Flex>
  );
}
