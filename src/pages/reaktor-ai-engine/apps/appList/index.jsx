import React from "react";
import { List, theme } from "antd";
import { apps } from "../../appDatabase";

import ReaktorTable from "./reaktorTable";

const AppList = () => {
  const {
    token: { paddingLG },
  } = theme.useToken();

  return (
    <List
      split={false}
      dataSource={apps}
      renderItem={(app) => (
        <List.Item
          key={app.id}
          style={{ paddingTop: 0, paddingBottom: paddingLG }}
        >
          <ReaktorTable app={app} />
        </List.Item>
      )}
    />
  );
};
export default AppList;
