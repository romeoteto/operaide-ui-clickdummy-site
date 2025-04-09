import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { theme } from "antd";

export default function Diagram({ chart }) {
  const containerRef = useRef(null);
  const { token } = theme.useToken();

  useEffect(() => {
    // Init Mermaid dynamically with AntD tokens
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      htmlLabels: false,
      themeVariables: {
        primaryColor: token.colorPrimary,
        primaryTextColor: token.colorTextLightSolid,
        primaryBorderColor: token.colorPrimaryBorder,

        lineColor: token.colorTextBase,
        textColor: token.colorText,

        fontFamily: token.fontFamily,
        fontSize: `${token.fontSize}px`,

        clusterBkg: token.colorFillQuaternary,
        clusterBorder: token.colorBorderSecondary,

        // 👇 Fix cluster header title
        tertiaryColor: token.colorPrimary, // background of cluster title
        tertiaryTextColor: token.colorText, // text color in the header
      },
    });

    const renderMermaid = async () => {
      if (!containerRef.current || !chart) return;

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

      try {
        const { svg } = await mermaid.render(id, chart);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid render error:", err);
        containerRef.current.innerHTML = `<pre style="color:red;">Mermaid error: ${err.message}</pre>`;
      }
    };

    renderMermaid();
  }, [chart, token]);

  return <div ref={containerRef} />;
}
