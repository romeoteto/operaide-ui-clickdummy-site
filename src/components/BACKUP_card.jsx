import { Tag, Card as AntCard, theme } from "antd";
import DynamicSVG from "../assets/reaktor-images/dynamicSVG";

const { Meta } = AntCard;

export default function Card({ label, description, imageSrc, official }) {
  const {
    token: {
      paddingXL,
      colorPrimary,
      colorTextBase,
      reaktorCard,
      colorFillQuaternary,
    },
  } = theme.useToken();

  return (
    <AntCard
      size="small"
      hoverable
      style={{ width: reaktorCard.cardWidth }}
      cover={
        <div
          style={{
            width: "100%",
            height: reaktorCard.coverHeight,
            padding: paddingXL,
            background: colorFillQuaternary,
            borderRadius: 0,
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
    </AntCard>
  );
}
