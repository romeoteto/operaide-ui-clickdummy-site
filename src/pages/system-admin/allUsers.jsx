import React from "react";
import { Table, Typography, Tag, Input, Flex } from "antd";
import { Link } from "wouter";
import { users } from "../../database/database";

const { Text } = Typography;
const { Search } = Input;

const AllUsers = () => {
  const usersWithFullNameAndMembershipCount = users.map((user) => ({
    ...user,
    fullName: `${user.prename} ${user.surname}`,
    membershipCount: user.memberships.length,
  }));

  const tableColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName, record) => (
        <Text>
          <Link href={`/system-admin/edit-user/${record.id}/account`}>
            {fullName}
          </Link>
        </Text>
      ),
    },
    { title: "E-Mail", dataIndex: "email", key: "email" },
    {
      title: "Global Role",
      dataIndex: "isSuperAdmin",
      key: "isSuperAdmin",
      render: (isSuperAdmin) =>
        isSuperAdmin ? (
          <Tag color="magenta">Super Admin</Tag>
        ) : (
          <Tag>Member</Tag>
        ),
    },
    { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
    { title: "Last Login", dataIndex: "lastLogin", key: "lastLogin" },
    {
      title: "Number of Organizations",
      dataIndex: "membershipCount",
      key: "membershipCount",
    },
  ];

  return (
    <Flex vertical gap="large">
      <Search placeholder="Search user" />
      <Table
        size="middle"
        columns={tableColumns}
        dataSource={usersWithFullNameAndMembershipCount}
      />
    </Flex>
  );
};

export default AllUsers;
