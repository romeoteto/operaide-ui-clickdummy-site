import { useState } from "react";
import { useParams, Link } from "wouter";
import { blueprints } from "../database";
import PageHeader from "../components/pageHeader";
import { LayoutDashboard, CircleGauge, Cloud, Settings2 } from "lucide-react";
import TabNav from "../components/tabNav";
import { Flex, Typography, Table, Tag, Image, Input, Button } from "antd";
import InfoPanel from "../components/infoPanel";

const { Link: AntLink } = Typography;
const { Search } = Input;

const tabs = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: CircleGauge, label: "Metrics" },
  { icon: Cloud, label: "API" },
  { icon: Settings2, label: "Settings" },
];

export default function DeploymentDetails() {
  const params = useParams();
  const [activeKey, setActiveKey] = useState(0);

  const { "reaktor-id": reaktorId, "deployment-id": deploymentId } = params;

  const blueprint = blueprints.find((bp) => bp.id === reaktorId);
  const deployment = blueprint.deployments.find(
    (deployment) => deployment.id === deploymentId
  );

  /* const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (deploymentId) => (
        <Link href={`/reaktor-ai-engine/${blueprint.id}/${deploymentId}`}>
          <AntLink>{deploymentId}</AntLink>
        </Link>
      ),
    },
    { title: "Variant", dataIndex: "variant", key: "variant" },
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
          {tags.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
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
  ]; */

  return (
    <div>
      <PageHeader title={deployment.label} />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => setActiveKey(key)}
      />
      {activeKey === 0 && (
        <InfoPanel
          id={deployment.id}
          label={deployment.label}
          description={deployment.description}
          type="Deployment"
          version={deployment.version}
          group={deployment.group}
          tags={deployment.tags}
          imageSrc={deployment.imageSrc}
          parentId={blueprint.id}
        />
      )}

      {/*  {activeKey === 3 && (
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
      )} */}
    </div>
  );
}
