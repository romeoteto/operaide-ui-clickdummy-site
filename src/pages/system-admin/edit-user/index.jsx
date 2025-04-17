import React from "react";
import { useParams, useSearchParams } from "wouter";

import { User, ShieldUser, Building } from "lucide-react";

import PageHeader from "../../../components/pageHeader";
import TabNav from "../../../components/tabNav";
import { users } from "../../../database/database";
import Account from "./account";
import Memberships from "./memberships";

const EditUser = () => {
  const params = useParams();
  const { "user-id": userId } = params;

  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get("activeKey") || 0;

  const user = users.find((user) => user.id === Number(userId));

  const { prename, surname, email } = user;

  const tabs = [
    {
      icon: User,
      label: "Account",
      component: <Account user={user} />,
    },
    {
      icon: ShieldUser,
      label: "Security",
    },
    {
      icon: Building,
      label: "Memberships",
      component: <Memberships />,
    },
  ];

  return (
    <>
      <PageHeader
        title={`${prename} ${surname}`}
        subtitle={`Here you can update the settings of ${prename} ${surname}.`}
      />
      <TabNav
        tabs={tabs}
        activeKey={Number(activeKey)}
        onTabClick={(key) => setSearchParams({ activeKey: key })}
      />
      {tabs[activeKey]?.component}
    </>
  );
};

export default EditUser;
