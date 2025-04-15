import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBorderRadius, setThemeColor } from "../../state/userSlice";
import {
  ColorPicker,
  List,
  Flex,
  Typography,
  Space,
  Card,
  Segmented,
  Button,
  theme,
} from "antd";

import { Sun, Moon, Palette, Square, SquareRoundCorner } from "lucide-react";

import { setAppearance } from "../../state/appSettingsSlice";

import { borderRadiusValues } from "../../database/database";

const { Text } = Typography;

const Theme = () => {
  const currentOrgTheme = useSelector(
    (state) => state.user.currentOrganization.theme
  );

  const resolvedAppearance = useSelector(
    (state) => state.appSettings.resolvedAppearance
  );

  const {
    token: {
      logo,
      signet,
      paddingXXS,
      lineWidth,
      borderRadius,
      colorBorder,
      marginSM,
    },
  } = theme.useToken();

  const dispatch = useDispatch();

  const LogoItem = () => {
    return (
      <>
        <Text strong>Logo</Text>
        <Flex
          align="center"
          justify="center"
          style={{
            height: 50,
            padding: paddingXXS,
            borderRadius,
            border: `${lineWidth}px solid ${colorBorder}`,
          }}
        >
          <img
            src={logo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            // the image tag here is just to simulate and AntD image upload component
          />
        </Flex>
      </>
    );
  };
  const IconItem = () => {
    return (
      <>
        <Text strong>Icon</Text>
        <Flex
          align="center"
          justify="center"
          style={{
            height: 50,
            width: 50,
            padding: paddingXXS,
            borderRadius,
            border: `${lineWidth}px solid ${colorBorder}`,
          }}
        >
          <img
            src={signet}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            // the image tag here is just to simulate and AntD image upload component
          />
        </Flex>
      </>
    );
  };

  const onSwitchRadius = (value) => {
    const borderRadius = borderRadiusValues.find(
      (borderRadiusValue) => borderRadiusValue.id === value
    );
    dispatch(setBorderRadius(borderRadius));
  };

  const RadiusItem = () => {
    return (
      <>
        <Text strong>Border Radius</Text>
        <Segmented
          value={currentOrgTheme.borderRadius.id}
          onChange={(value) => onSwitchRadius(value)}
          options={[
            {
              value: "square",
              label: "Square",
              icon: (
                <span
                  style={{
                    display: "inline-block",
                    lineHeight: 0, // so the SVG doesn't add extra space
                    verticalAlign: "-0.125em", // "pull" it down a hair
                  }}
                >
                  <Square size="1em" />
                </span>
              ),
            },
            {
              value: "rounded",
              label: "Rounded",
              icon: (
                <span
                  style={{
                    display: "inline-block",
                    lineHeight: 0, // so the SVG doesn't add extra space
                    verticalAlign: "-0.125em", // "pull" it down a hair
                  }}
                >
                  <SquareRoundCorner size="1em" />
                </span>
              ),
            },
          ]}
        />
      </>
    );
  };
  const data = [
    <LogoItem />,
    <IconItem />,
    <>
      <Text strong>Brand Color</Text>
      <Flex align="center" gap="small">
        {resolvedAppearance === "light" ? (
          <>
            <Text type="secondary">Light Mode:</Text>
            <ColorPicker
              value={currentOrgTheme?.light.colorPrimary}
              onChangeComplete={(color) =>
                dispatch(
                  setThemeColor({
                    mode: "light", // or "dark"
                    key: "colorPrimary", // or "colorInfo"
                    value: color.toHexString(),
                  })
                )
              }
            />
          </>
        ) : (
          <>
            <Text type="secondary">Dark Mode:</Text>
            <ColorPicker
              value={currentOrgTheme?.dark.colorPrimary}
              onChangeComplete={(color) =>
                dispatch(
                  setThemeColor({
                    mode: "dark", // or "dark"
                    key: "colorPrimary", // or "colorInfo"
                    value: color.toHexString(),
                  })
                )
              }
            />
          </>
        )}
      </Flex>
    </>,
    <>
      <Text strong>Info Color</Text>
      <Flex align="center" gap="small">
        {resolvedAppearance === "light" ? (
          <>
            <Text type="secondary">Light Mode:</Text>
            <ColorPicker
              value={currentOrgTheme?.light.colorInfo}
              onChangeComplete={(color) =>
                dispatch(
                  setThemeColor({
                    mode: "light", // or "dark"
                    key: "colorInfo", // or "colorInfo"
                    value: color.toHexString(),
                  })
                )
              }
            />
          </>
        ) : (
          <>
            <Text type="secondary">Dark Mode:</Text>
            <ColorPicker
              value={currentOrgTheme?.dark.colorInfo}
              onChangeComplete={(color) =>
                dispatch(
                  setThemeColor({
                    mode: "dark", // or "dark"
                    key: "colorInfo", // or "colorInfo"
                    value: color.toHexString(),
                  })
                )
              }
            />
          </>
        )}
      </Flex>
    </>,
    <RadiusItem />,
  ];

  const EditOrgThemePanel = () => {
    return (
      <>
        <Flex
          align="center"
          justify="flex-end"
          gap="small"
          style={{ marginBottom: marginSM }}
        >
          <Text type="secondary">Switch Appearance</Text>
          <Segmented
            onChange={(value) => dispatch(setAppearance(value))}
            value={resolvedAppearance}
            size="small"
            options={[
              {
                value: "light",
                icon: (
                  <span
                    style={{
                      display: "inline-block",
                      lineHeight: 0, // so the SVG doesn't add extra space
                      verticalAlign: "-0.125em", // "pull" it down a hair
                    }}
                  >
                    <Sun size="1em" />
                  </span>
                ),
              },
              {
                value: "dark",
                icon: (
                  <span
                    style={{
                      display: "inline-block",
                      lineHeight: 0, // so the SVG doesn't add extra space
                      verticalAlign: "-0.125em", // "pull" it down a hair
                    }}
                  >
                    <Moon size="1em" />
                  </span>
                ),
              },
            ]}
          />
        </Flex>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Flex justify="space-between" align="center" style={{ flex: 1 }}>
                {item}
              </Flex>
            </List.Item>
          )}
        />
      </>
    );
  };

  return (
    <>
      {currentOrgTheme.type === "org" ? (
        <EditOrgThemePanel />
      ) : (
        <Card>
          <Flex align="center" justify="space-between">
            <Text>This organization uses the global system theme.</Text>
            <Button icon={<Palette size="1em" />} type="primary">
              Define Organization Theme
            </Button>
          </Flex>
        </Card>
      )}
    </>
  );
};

export default Theme;
