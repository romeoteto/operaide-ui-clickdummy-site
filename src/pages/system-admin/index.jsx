import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";

import { Users, Building, TrendingUp, ShieldCheck } from "lucide-react";
import PageHeader from "../../components/pageHeader";
import TabNav from "../../components/tabNav";
import AllUsers from "./allUsers";

const tabs = [
  {
    icon: Building,
    label: "Organizations",
    href: "/system-admin/organizations",
    permission: "canViewOrganizations",
  },
  {
    icon: Users,
    label: "All Users",
    href: "/system-admin/all-users",
    component: <AllUsers />,
    permission: "canViewUsers",
  },
  {
    icon: TrendingUp,
    label: "Migrations",
    href: "/system-admin/migrations",
    permission: "canViewMigrations",
  },
  {
    icon: ShieldCheck,
    label: "Permissions",
    href: "/system-admin/permissions",
    permission: "canViewPermissions",
  },
];

export default function PageSystemAdmin() {
  const [activeKey, setActiveKey] = useState(0);
  const [location, navigate] = useLocation();

  const currentPermissions = useSelector(
    (state) => state.user.currentPermissions
  );

  const userIsSuperAdmin = useSelector(
    (state) => state.user.currentUser.isSuperAdmin
  );

  const onTabClick = (key) => {
    const href = filteredTabs[key].href;
    navigate(href);
  };

  const filteredTabs = userIsSuperAdmin
    ? tabs
    : tabs.filter((tab) =>
        currentPermissions.global.systemAdmin.includes(tab.permission)
      );

  useEffect(() => {
    const index = filteredTabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location, filteredTabs]);

  return (
    <>
      <PageHeader
        title="System Administration"
        subtitle="Here you can manage global settings for your Operaide instance."
      />
      <TabNav
        tabs={filteredTabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      {filteredTabs[activeKey]?.component}
    </>
  );
}
