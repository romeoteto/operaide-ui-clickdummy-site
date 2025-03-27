import { useState } from "react";
import { useParams, Link } from "wouter";
import { blueprints } from "../database";
import PageHeader from "../components/pageHeader";
import { LayoutDashboard, Workflow, Settings2, Rocket } from "lucide-react";
import TabNav from "../components/tabNav";
import {
  Flex,
  Typography,
  Table,
  Tag,
  Image,
  Input,
  Divider,
  Button,
} from "antd";
import InfoPanel from "../components/infoPanel";

const { Link: AntLink, Text } = Typography;
const { Search } = Input;

const tabs = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Workflow, label: "Diagram" },
  { icon: Settings2, label: "Default Settings" },
  { icon: Rocket, label: "Deployments" },
];

export default function ReaktorDetails() {
  const params = useParams();
  const [activeKey, setActiveKey] = useState(0);

  const { "reaktor-id": reaktorId } = params;

  const blueprint = blueprints.find((bp) => bp.id === reaktorId);

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (deploymentId) => (
        <Text>
          <Link href={`/reaktor-ai-engine/${blueprint.id}/${deploymentId}`}>
            {deploymentId}
          </Link>
        </Text>
      ),
    },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Label", dataIndex: "label", key: "label" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (str) => (str.length > 30 ? str.slice(0, 30) + "..." : str),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { imageSrc }) => (
        <Image src={imageSrc} width={50} preview={false} />
      ),
    },
    { title: "Group", dataIndex: "group", key: "group" },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => <AntLink>Delete</AntLink>,
    },
  ];

  return (
    <div>
      <PageHeader title={blueprint.label} />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        setActiveKey={(key) => setActiveKey(key)}
      />
      {activeKey === 0 && (
        <Flex vertical gap="middle">
          <InfoPanel
            id={blueprint.id}
            label={blueprint.label}
            description={blueprint.description}
            type={blueprint.type}
            version={blueprint.version}
            group={blueprint.group}
            tags={blueprint.tags}
            imageSrc={blueprint.imageSrc}
          />
        </Flex>
      )}

      {activeKey === 3 && (
        <Flex vertical gap="large">
          <Flex gap="large">
            <Search placeholder="Search deployment" />
            <Button type="primary" icon={<Rocket size="1em" />}>
              Create new deployment
            </Button>
          </Flex>
          <Table
            size="middle"
            columns={tableColumns}
            dataSource={blueprint.deployments}
          />
        </Flex>
      )}
    </div>
  );
}
