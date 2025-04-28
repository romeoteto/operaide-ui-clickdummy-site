// ./livePreview.js
import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as antd from "antd";
import * as lucide from "lucide-react";
import dayjs from "dayjs";
import { theme } from "antd";

const scope = {
  React,
  antd,
  ...antd,
  lucide,
  ...lucide,
  theme,
  dayjs,
};

export default function LivePreviewComponent({ code, showEditor }) {
  const {
    token: { lineWidth, colorSplit },
  } = theme.useToken();
  return (
    <antd.Flex justify="center" style={{ width: "100%" }}>
      <LiveProvider code={code} scope={scope} noInline>
        <antd.Flex style={{ flex: 1, paddingRight: showEditor && 24 }}>
          <LiveError style={{ color: "red", marginBottom: 10 }} />
          <LivePreview style={{ width: "100%" }} />
        </antd.Flex>
        <antd.Flex
          vertical
          style={{
            height: "100%",
            width: 600,
            marginRight: showEditor ? 0 : -600,
            borderLeft: showEditor && `${lineWidth}px solid ${colorSplit}`,
            transition: "all 0.2s",
            paddingLeft: 24,
            paddingRight: 0,
            overflowY: "auto",
          }}
        >
          <antd.Typography.Title level={4}>Source Code</antd.Typography.Title>
          <LiveEditor
            style={{
              fontSize: 14,
            }}
          />
        </antd.Flex>
      </LiveProvider>
    </antd.Flex>
  );
}
