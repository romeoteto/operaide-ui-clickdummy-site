import React from "react";
import { useDispatch } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Button } from "antd";
import {
  setAppInstallVisible,
  setAppToBeInstalled,
} from "../../state/appStoreSlice";

import { Box } from "lucide-react";

const data = Array.from({ length: 23 }).map((_, i) => ({
  id: i,
  href: "/app-store/12345/install",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const AppsList = () => {
  const dispatch = useDispatch();

  const installApp = (item) => {
    dispatch(setAppInstallVisible(true));
    dispatch(setAppToBeInstalled({ item }));
  };
  return (
    <List
      itemLayout="vertical"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <Button
              onClick={() => installApp(item)}
              type="default"
              icon={<Box size="1em" />}
            >
              Install
            </Button>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.title}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};
export default AppsList;
