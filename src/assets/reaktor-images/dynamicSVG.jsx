import React, { useEffect, useState } from "react";

const DynamicSVG = ({ src, fillColor = "#02C4C0", style = {}, ...props }) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((svg) => {
        const updatedSvg = svg
          .replace(/fill="#02C4C0"/gi, `fill="${fillColor}"`)
          .replace(/width="[^"]*"/i, "")
          .replace(/height="[^"]*"/i, "");

        // Optional: make sure the <svg> scales responsively
        const styledSvg = updatedSvg.replace(
          /<svg([^>]*)>/i,
          `<svg$1 style="width:100%; height:100%; display:block;">`
        );

        setSvgContent(styledSvg);
      })
      .catch((err) => {
        console.error("Failed to load SVG:", err);
        setSvgContent("<svg></svg>"); // Fallback
      });
  }, [src, fillColor]);

  return (
    <div
      {...props}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default DynamicSVG;
