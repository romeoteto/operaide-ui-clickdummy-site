import React from "react";
import { useParams } from "wouter";
import { Select, Table, Typography, theme } from "antd";
import { ChevronDown } from "lucide-react";

import { orgRoles, organizations, users } from "../../../database/database";

const { Link } = Typography;

const Memberships = () => {
  const { "user-id": userId } = useParams();

  const user = users.find((user) => String(user.id) === userId);

  const memberships = user.memberships;

  const enhancedMemberships = memberships.map((membership) => ({
    organization: organizations.find(
      (organization) => organization.value === membership.orgValue
    ).label,
    roleValue: membership.roleValue,
  }));

  const tableColumns = [
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "Role",
      dataIndex: "roleValue",
      key: "roleValue",
      render: (roleValue) => (
        <Select
          options={orgRoles}
          value={roleValue}
          style={{ width: 150 }}
          variant="filled"
          suffixIcon={<ChevronDown size="1.25em" />}
        />
      ),
    },
    {
      key: "remove",
      render: () => <a>Remove from Organization</a>,
    },
  ];

  return (
    <Table
      size="middle"
      bordered
      columns={tableColumns}
      dataSource={enhancedMemberships}
      pagination={{
        showSizeChanger: true,
      }}
    />
  );
};

export default Memberships;
