import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import {
  Flex,
  Divider,
  Typography,
  Select,
  Dropdown,
  Form,
  Button,
  Tag,
  Avatar,
  theme,
} from "antd";

import { getOrganizationsByMemberships } from "../../helpers";
import {
  User,
  LogOut,
  Monitor,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  Languages,
  SunMoon,
  Boxes,
} from "lucide-react";
import Fuse from "fuse.js";

import { setAppearance } from "../../state/appSettingsSlice";
import { setCurrentOrganization, setLogout } from "../../state/userSlice";

const { Text, Title } = Typography;

export default function UserMenu3({ showOrgSelect, showVisitBackend }) {
  const {
    token: {
      fontSize,
      marginXXS,
      paddingSM,
      colorBgElevated,
      borderRadiusLG,
      boxShadowSecondary,
      paddingXXS,
      paddingXS,
    },
  } = theme.useToken();

  const [, navigate] = useLocation();

  const memberships = useSelector(
    (state) => state.user.currentUser.memberships
  );

  const organizations = getOrganizationsByMemberships(memberships);

  const [orgSearchTerm, setOrgSearchTerm] = useState("");

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

  const { prename, surname, email, isSuperAdmin } = useSelector(
    (state) => state.user.currentUser
  );

  const dispatch = useDispatch();

  /* This is the custom content part of the dropdown */
  const Content = () => {
    const onChange = (value) => {
      dispatch(setCurrentOrganization(value));
      navigate("/");
    };

    const onSearch = (value) => {
      setOrgSearchTerm(value);
    };

    const fuse = new Fuse(organizations, {
      keys: ["label"],
      threshold: 0.4, // Lower = stricter matching
      ignoreLocation: true,
    });

    const filteredOrganizations = orgSearchTerm
      ? fuse.search(orgSearchTerm).map((result) => result.item)
      : organizations;

    return (
      <Flex vertical style={{ width: "300px" }}>
        <Flex
          vertical
          align="flex-start"
          gap="small"
          style={{
            padding: paddingSM,
            borderTopLeftRadius: borderRadiusLG,
            borderTopRightRadius: borderRadiusLG,
          }}
        >
          <Flex vertical>
            <Title level={5} style={{ marginBottom: 0 }}>
              {prename} {surname}
            </Title>
            <Text type="secondary">{email}</Text>
          </Flex>
          {isSuperAdmin && <Tag color="magenta">Super Admin</Tag>}
        </Flex>{" "}
        {showOrgSelect && (
          <>
            <div style={{ paddingLeft: paddingXXS, paddingRight: paddingXXS }}>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
            </div>

            <Form
              layout="vertical"
              style={{
                paddingLeft: paddingSM,
                paddingRight: paddingSM,
                paddingBottom: paddingXS,
                paddingTop: paddingXS,
              }}
            >
              <Form.Item label="My Organizations" style={{ marginBottom: 0 }}>
                <Select
                  showSearch
                  placeholder="Select an organization"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  options={filteredOrganizations}
                  suffixIcon={<ChevronDown size="1.25em" />}
                  size="middle"
                  value={currentOrganization}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Flex>
    );
  };
  /* This is the custom content part of the dropdown */

  /* This is the content of the dropdowns menu items */
  const [selectedLang, setSelectedLang] = useState("en");
  const appearance = useSelector((state) => state.appSettings.appearance);

  const languageItems = [
    { key: "en", label: "English" },
    { key: "de", label: "German" },
    { key: "fr", label: "French" },
    { key: "sw", label: "Schwäbisch" },
  ];

  const appearanceItems = [
    { key: "dark", label: "Dark", icon: <Moon size="1em" /> },
    { key: "light", label: "Light", icon: <Sun size="1em" /> },
    { key: "system", label: "System", icon: <Monitor size="1em" /> },
  ];

  const dropdownItems = [
    {
      type: "divider",
    },
    {
      key: "1",
      label: `Language (${selectedLang.toUpperCase()})`,
      icon: (
        <span>
          <Languages size={fontSize} style={{ marginBottom: "-0.35em" }} />
        </span>
      ),
      children: languageItems.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => setSelectedLang(item.key),
        className:
          item.key === selectedLang ? "ant-dropdown-menu-item-selected" : "",
      })),
    },
    {
      key: "2",
      label: `Appearance`,
      icon: (
        <span>
          <SunMoon size={fontSize} style={{ marginBottom: "-0.35em" }} />
        </span>
      ),
      children: appearanceItems.map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
        onClick: (event) => dispatch(setAppearance(event.key)),
        className:
          item.key === appearance ? "ant-dropdown-menu-item-selected" : "",
      })),
    },
    {
      type: "divider",
    },
    ...(showVisitBackend
      ? [
          {
            key: "extra",
            label: "Show Apps",
            icon: <Boxes size="1em" />,
            onClick: () => navigate("/reaktor-ai-engine/apps"),
          },
          {
            type: "divider",
          },
        ]
      : []),
    {
      key: "3",
      icon: <LogOut size={fontSize} />,
      label: "Logout",
      onClick: () => dispatch(setLogout()),
    },
  ];
  /* This is the content of the dropdowns menu items */

  return (
    <Dropdown
      getPopupContainer={() => document.getElementById("area")}
      menu={{
        items: dropdownItems,
        expandIcon: (
          <span>
            <ChevronRight size="1em" style={{ marginBottom: "-0.125em" }} />
          </span>
        ),
      }}
      placement="bottomRight"
      trigger="click"
      dropdownRender={(menu) => (
        <div
          style={{
            backgroundColor: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
          }}
        >
          <Content />
          {React.cloneElement(menu, { style: { boxShadow: "none" } })}
        </div>
      )}
    >
      <Avatar icon={<User size="1em" />} style={{ cursor: "pointer" }} />
    </Dropdown>
  );
}
