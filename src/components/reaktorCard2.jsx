import { Tag, Card, theme } from "antd";
import DynamicSVG from "../assets/reaktor-images/dynamicSVG";

const { Meta } = Card;

export default function ReaktorCard({
  label,
  description,
  imageSrc,
  official,
}) {
  const {
    token: { paddingXL, colorPrimary, colorTextBase, reaktorCard },
  } = theme.useToken();

  return (
    <Card
      size="small"
      hoverable
      style={{ width: reaktorCard.cardWidth }}
      cover={
        <div
          style={{
            width: "100%",
            height: reaktorCard.coverHeight,
            padding: paddingXL,
          }}
        >
          <DynamicSVG src={imageSrc} fillColor={colorPrimary} />
        </div>
      }
      extra={
        <Tag
          bordered={false}
          color={official ? colorPrimary : colorTextBase}
          style={{ margin: 0 }}
        >
          {official ? "Operaide Team" : "Community"}
        </Tag>
      }
    >
      <Meta
        title={label}
        description={description}
        style={{ height: reaktorCard.metaHeight }}
      />
    </Card>
  );
}
