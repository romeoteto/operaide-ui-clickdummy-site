import React from "react";
import { Input, Form, Button, Divider, Typography, Flex, theme } from "antd";

const { Title, Text } = Typography;

const Container = ({
  title,
  subtext,
  actionText,
  actionButton,
  children,
  danger,
}) => {
  const {
    token: {
      padding,
      paddingLG,
      colorBorderSecondary,
      borderRadius,
      lineWidth,
      colorBgLayout,
      colorErrorBorder,
      colorErrorBg,
    },
  } = theme.useToken();
  return (
    <Flex
      vertical
      style={{
        border: `${lineWidth}px solid ${
          danger ? colorErrorBorder : colorBorderSecondary
        }`,
        borderRadius,
        maxWidth: "800px",
      }}
    >
      <Flex vertical style={{ padding: paddingLG }}>
        <Title level={4}>{title}</Title>
        {subtext && <Text>{subtext}</Text>}
      </Flex>
      <div
        style={{
          paddingLeft: paddingLG,
          paddingRight: paddingLG,
          paddingBottom: paddingLG,
        }}
      >
        {children}
      </div>
      <Flex
        justify="space-between"
        align="center"
        style={{
          background: danger ? colorErrorBg : colorBgLayout,
          paddingLeft: paddingLG,
          paddingRight: paddingLG,
          paddingBottom: padding,
          paddingTop: padding,
          borderTop: `${lineWidth}px solid ${
            danger ? colorErrorBorder : colorBorderSecondary
          }`,
        }}
      >
        <Text>{actionText}</Text>
        <div>{actionButton}</div>
      </Flex>
    </Flex>
  );
};

const Account = ({ user }) => {
  const {
    token: {
      padding,
      paddingLG,
      colorBorderSecondary,
      borderRadius,
      lineWidth,
      colorBgLayout,
    },
  } = theme.useToken();
  return (
    <Flex vertical gap="large">
      <Container
        title="Name"
        subtext="Specify pre- and subname. It will be displayed throughout the app."
        actionButton={<Button type="primary">Save</Button>}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            gap: padding,
          }}
        >
          <Form.Item placeholder="Prename" style={{ flex: 1, margin: 0 }}>
            <Input value={user.prename} />
          </Form.Item>
          <Form.Item placeholder="Surname" style={{ flex: 1, margin: 0 }}>
            <Input value={user.surname} />
          </Form.Item>
        </Form>
      </Container>
      <Container
        title="E-Mail"
        subtext="Specify the e-mail that will be used for log in with Operaide."
        actionButton={<Button type="primary">Save</Button>}
      >
        <Form layout="vertical" style={{ display: "flex", gap: padding }}>
          <Form.Item
            placeholder="E-Mail"
            style={{ maxWidth: "500px", flex: 1, margin: 0 }}
          >
            <Input value={user.email} />
          </Form.Item>
        </Form>
      </Container>

      <Container
        danger
        title="Delete Account"
        subtext="Permanently remove the account from the Operaide platform. This action is not reversible, so please continue with caution."
        actionButton={
          <Button danger type="primary">
            Delete user account
          </Button>
        }
      ></Container>
    </Flex>
  );
};

export default Account;
