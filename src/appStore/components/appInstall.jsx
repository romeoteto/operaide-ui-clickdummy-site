import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, Flex, Select, theme } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { setAppInstallVisible } from "../../state/appStoreSlice";
import { ChevronDown } from "lucide-react";
import { organizations, orgRoles } from "../../database/database";
import LoginForm from "../../components/loginForm";
import { setCurrentOrganization } from "../../state/userSlice";
import { installApp } from "../../state/installedAppsSlice";

const { Text } = Typography;
const AppInstall = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useDispatch();

  const { appInstallVisible, appToBeInstalled } = useSelector(
    (state) => state.appStore
  );

  const [_, navigate] = useLocation();

  const {
    token: { marginXL },
  } = theme.useToken();

  const memberships = useSelector(
    (state) => state.user.currentUser.memberships
  );

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const orgsWithInstallStatus =
    isLoggedIn &&
    memberships.map((membership) => {
      const org = organizations.find((o) => o.value === membership.orgValue);
      const role = orgRoles.find((r) => r.value === membership.roleValue);

      const canInstall =
        role?.permissions?.org?.appStore?.includes("canInstallApps");

      return {
        ...org,
        disabled: !canInstall,
      };
    });

  const onChange = (value) => {
    dispatch(setCurrentOrganization(value));
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      dispatch(setAppInstallVisible(false));
      dispatch(
        installApp({
          orgValue: currentOrganization.value,
          appId: appToBeInstalled.id,
        })
      );
      setConfirmLoading(false);
      navigate("/reaktor-ai-engine"); // ✅ move this last
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(setAppInstallVisible(false));
  };

  return (
    <>
      <Modal
        title="Install App"
        open={appInstallVisible}
        onOk={handleOk}
        okText="Install"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={!isLoggedIn ? null : undefined}
      >
        <Flex vertical gap="large">
          <Text>
            {!isLoggedIn
              ? "You need to log in to Operaide before you can install apps."
              : "Please specify the organization you want the app to be installed."}
          </Text>
          <div>
            {isLoggedIn ? (
              <Flex vertical gap="large" style={{ marginBottom: marginXL }}>
                <Text>
                  <strong>Note:</strong> You can only install apps in
                  organizations where you have the right permissions.
                </Text>
                <Select
                  placeholder="Select an organization"
                  value={currentOrganization.value}
                  onChange={(value) => onChange(value)}
                  style={{ width: "100%" }}
                  size="large"
                  suffixIcon={<ChevronDown size="1.25em" />}
                  options={orgsWithInstallStatus}
                />
              </Flex>
            ) : (
              <LoginForm />
            )}{" "}
          </div>
        </Flex>
      </Modal>
    </>
  );
};
export default AppInstall;
