import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/userSlice";
import { Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <Form
      name="signup"
      onFinish={(data) => dispatch(setLogin(data.email))}
      layout="vertical"
      style={{ width: "100%" }}
    >
      <Form.Item label="E-Mail" name="email">
        <Input size="large" prefix={<Mail size="1em" />} />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input size="large" type="password" prefix={<Lock size="1em" />} />
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
  );
};

export default LoginForm;
