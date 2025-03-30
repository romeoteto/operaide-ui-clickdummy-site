import React, { useState } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import {
  Menu,
  Flex,
  Typography,
  Input,
  Divider,
  Radio,
  Select,
  theme,
} from "antd";
import Fuse from "fuse.js";

import { organizations } from "../utils";

const { SubMenu, Item } = Menu;
const { Text, Title } = Typography;

export default function UserMenu2({
  currentOrganization,
  setCurrentOrganization,
}) {
  const {
    token: {
      paddingSM,
      paddingXS,
      padding,
      colorTextBase,
      marginXXS,
      fontSizeLG,
      colorBgBase,
    },
  } = theme.useToken();

  const langSelectStyle = {
    display: "flex",
    flexDirection: "column",
    padding: paddingSM,
    gap: 4,
  };

  const [lang, setLang] = useState(1);
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

  return (
    <SubMenu key="/user" icon={<User size="1em" />} title="Oliver Mayer">
      <Flex
        vertical
        gap="middle"
        justify="center"
        align="center"
        style={{
          padding: padding,
        }}
      >
        <Flex
          style={{
            borderRadius: "100%",
            padding: paddingXS,
            background: colorTextBase,
          }}
        >
          <Text strong style={{ fontSize: fontSizeLG, color: colorBgBase }}>
            OM
          </Text>
        </Flex>

        <Text>oliver.mayer@objective-partner.com</Text>
      </Flex>
      <Divider style={{ margin: 0 }} />
      <Flex vertical style={{ padding: paddingSM }}>
        <Title level={5}>Organizations</Title>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={(e) => onSearch(e.target.value)}
          options={filteredOrganizations}
          suffixIcon={<ChevronDown size="1.25em" />}
          size="middle"
          value={currentOrganization}
        />
      </Flex>

      <Divider style={{ marginTop: marginXXS, marginBottom: marginXXS }} />
      <SubMenu title="Language (EN)">
        <Radio.Group
          style={langSelectStyle}
          onChange={(e) => setLang(e.target.value)}
          value={lang}
          options={[
            { value: 1, label: "English" },
            { value: 2, label: "German" },
            { value: 3, label: "French" },
            { value: 4, label: "Italian" },
            { value: 5, label: "Bavarian" },
          ]}
        />
      </SubMenu>
      <Item key="7" icon={<LogOut size="1em" />}>
        Logout
      </Item>
    </SubMenu>
  );
}
