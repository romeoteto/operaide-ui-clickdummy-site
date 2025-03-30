import React, { useState } from "react";
import {
  Popover,
  Button,
  Flex,
  Divider,
  Typography,
  Select,
  theme,
  Menu,
} from "antd";
import { organizations } from "../../utils";
import { User } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Fuse from "fuse.js";
import "./userMenu3.css";

const { Title, Text } = Typography;

export default function UserMenu3({
  currentOrganization,
  collapsed,
  setCurrentOrganization,
}) {
  const {
    token: {
      colorBgBase,
      colorTextBase,
      fontSize,
      fontSizeLG,
      paddingXXS,
      paddingXS,
      paddingSM,
      padding,
      colorPrimaryBg,
      marginXXS,
      colorBgTextHover,
      borderRadius,
      colorBgContainer,
    },
  } = theme.useToken();

  const [orgSearchTerm, setOrgSearchTerm] = useState("");

  const fuse = new Fuse(organizations, {
    keys: ["label"],
    threshold: 0.4, // Lower = stricter matching
    ignoreLocation: true,
  });

  const filteredOrganizations = orgSearchTerm
    ? fuse.search(orgSearchTerm).map((result) => result.item)
    : organizations;

  const onChange = (value) => {
    setCurrentOrganization(value);
  };
  const onSearch = (value) => {
    setOrgSearchTerm(value);
  };

  const currentOrgLabel = organizations.find(
    (organization) => organization.value === currentOrganization
  ).label;

  const content = (
    <Flex vertical>
      <Flex
        vertical
        gap="middle"
        justify="center"
        align="center"
        style={{ padding: paddingSM }}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            borderRadius: "100%",
            width: "34px",
            height: "34px",
            padding: paddingXS,
            background: colorTextBase,
            color: colorBgContainer,
          }}
        >
          <User size="1em" />
        </Flex>
        <Text>oliver.mayer@objective-partner.com</Text>
      </Flex>
      <Divider style={{ margin: 0 }} />
      <Flex vertical style={{ padding: paddingXS }}>
        <Title level={5}>Organizations</Title>
        <Select
          showSearch
          placeholder="Select an organization"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={(e) => onSearch(e.target.value)}
          options={filteredOrganizations}
          suffixIcon={<ChevronDown size="1.25em" />}
          size="middle"
          value={currentOrganization}
        />
      </Flex>
      <Divider style={{ margin: 0 }} />
    </Flex>
  );

  return (
    <Popover
      content={content}
      placement="topLeft"
      trigger="click"
      arrow={false}
      styles={{ body: { padding: 0, width: "300px" } }}
    >
      <Flex
        align="center"
        justify={collapsed && "center"}
        gap="small"
        className="user-menu-container"
        style={{
          "--margin-xxs": `${marginXXS}px`,
          "--padding-xs": `${!collapsed && paddingXS}px`,
          "--border-radius": `${borderRadius}px`,
          "--color-bg-hover": colorBgTextHover,
          "--color-primary-bg": colorPrimaryBg,
          paddingTop: collapsed && paddingXXS,
          paddingBottom: collapsed && paddingXXS,
        }}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            borderRadius: "100%",
            width: "34px",
            height: "34px",
            background: colorTextBase,
            color: colorBgContainer,
            flexShrink: 0,
          }}
        >
          <User size={collapsed ? fontSizeLG : fontSize} />
        </Flex>
        {!collapsed && (
          <Flex
            vertical
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            <Text
              strong
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {currentOrgLabel}
            </Text>
            <Text
              type="secondary"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              Oliver Mayer
            </Text>
          </Flex>
        )}
      </Flex>
    </Popover>
  );
}
