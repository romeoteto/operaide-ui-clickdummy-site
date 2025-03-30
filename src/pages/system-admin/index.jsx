import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { Users, Building, TrendingUp, ShieldCheck } from "lucide-react";
import PageHeader from "../../components/pageHeader";
import TabNav from "../../components/tabNav";

const tabs = [
  {
    icon: Building,
    label: "Organizations",
    href: "/system-admin/organizations",
  },
  { icon: Users, label: "All Users", href: "/system-admin/all-users" },
  { icon: TrendingUp, label: "Migrations", href: "/system-admin/migrations" },
  {
    icon: ShieldCheck,
    label: "Permissions",
    href: "/system-admin/permissions",
  },
];

export default function PageSystemAdmin() {
  const [activeKey, setActiveKey] = useState(0);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location]);

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  return (
    <div>
      <PageHeader
        title="System Administration"
        subtitle="Here you can manage global settings for your Operaide instance."
      />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      {/* Assuming this handles tab UI + active state */}
    </div>
  );
}
