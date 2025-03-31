import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Divider,
  Typography,
  Select,
  Dropdown,
  Button,
  Tag,
  theme,
} from "antd";
import { organizations } from "../../database";
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
} from "lucide-react";
import Fuse from "fuse.js";

import { setOrganization, setAppearance } from "../../state/appSettingsSlice";

const { Text, Title } = Typography;

export default function UserMenu3ALT({ collapsed }) {
  const {
    token: {
      fontSize,
      paddingSM,
      colorBgElevated,
      borderRadiusLG,
      boxShadowSecondary,
    },
  } = theme.useToken();

  const [orgSearchTerm, setOrgSearchTerm] = useState("");

  const currentOrganization = useSelector(
    (state) => state.appSettings.currentOrganization
  );

  const currentOrgLabel = currentOrganization.label;

  const dispatch = useDispatch();

  /* This is the custom content part of the dropdown */
  const Content = () => {
    const onChange = (value) => {
      dispatch(setOrganization(value));
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
            <Title level={4} style={{ marginBottom: 0 }}>
              Oliver Mayer
            </Title>
            <Text>oliver.mayer@objective-partner.com</Text>
          </Flex>

          <Tag color="#9D6381">Super Admin</Tag>
        </Flex>
        <Divider style={{ margin: 0 }} />
        <Flex vertical style={{ padding: paddingSM }} gap="small">
          <Text strong>My Organizations</Text>
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
      key: "3",
      icon: <LogOut size={fontSize} />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Logout
        </a>
      ),
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
      <Button
        color="default"
        variant="filled"
        shape="circle"
        icon={<User size="1em" />}
      />
    </Dropdown>
  );
}
