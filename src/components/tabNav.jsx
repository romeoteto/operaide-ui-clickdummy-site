import React from "react";
import { Tabs, theme } from "antd";
export default function TabNav({ tabs, activeKey, onTabClick }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: colorBgContainer,
        zIndex: 1,
      }}
    >
      <Tabs
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
        items={tabs.map((tab, index) => ({
          key: index,
          label: tab.label,
          icon: (
            <span
              style={{
                display: "inline-block",
                lineHeight: 0, // so the SVG doesn't add extra space
                verticalAlign: "-0.125em", // "pull" it down a hair
              }}
            >
              <tab.icon size="1em" />
            </span>
          ),
        }))}
      />
    </div>
  );
}
