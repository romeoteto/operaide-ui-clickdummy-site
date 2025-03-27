import { Settings2, Users, UserPlus, KeyRound } from "lucide-react";
import PageHeader from "../components/pageHeader";
import TabNav from "../components/tabNav";

const tabs = [
  { icon: Settings2, label: "General" },
  { icon: Users, label: "Members" },
  { icon: UserPlus, label: "Registration" },
  { icon: KeyRound, label: "API Keys" },
];

export default function PageSettings() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Here you can manage the settings for the “Organization B” organization."
      />
      <TabNav tabs={tabs} />
      <div style={{ height: "2000px", backgroundColor: "#f5f5f5" }}>
        Some content here
      </div>
    </>
  );
}
