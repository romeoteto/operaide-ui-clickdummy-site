import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
import { full as emoji } from "markdown-it-emoji";
import hljs from "highlight.js";
import { Typography, theme } from "antd";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const { useToken } = theme;

const MarkdownRenderer = ({ content }) => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const currentTheme = useSelector(
    (state) => state.appSettings.resolvedAppearance
  );
  const isDarkMode = currentTheme === "dark";

  useEffect(() => {
    const existingLink = document.getElementById("hljs-theme");

    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "hljs-theme";
    link.href = isDarkMode
      ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";

    document.head.appendChild(link);

    return () => {
      if (link) link.remove();
    };
  }, [isDarkMode]);

  const mdParser = useMemo(() => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        const languageLabel = lang || "plaintext";
        const preStyle = `background-color: ${token.colorFillQuaternary}; padding: 0; border-radius: ${token.borderRadiusLG}px; border: ${token.lineWidth}px solid ${token.colorBorderSecondary};`;
        const headerStyle = `padding: ${token.paddingXS}px ${token.paddingSM}px; border-bottom: ${token.lineWidth}px solid ${token.colorBorderSecondary}; font-size: ${token.fontSizeSM}px; color: ${token.colorTextTertiary}`;

        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              `<pre style="${preStyle}"><div style="${headerStyle}">${languageLabel}</div><code class="hljs">` +
              hljs.highlight(str, { language: lang, ignoreIllegals: true })
                .value +
              "</code></pre>"
            );
          } catch (__) {}
        }

        return (
          `<pre style="${preStyle}"><div style="${headerStyle}">${languageLabel}</div><code class="hljs">` +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      },
    });

    md.use(emoji);

    // Table styling
    md.renderer.rules.table_open = () => {
      return `<table style="width: 100%; border-collapse: collapse; margin-bottom: ${token.margin}px;">`;
    };

    md.renderer.rules.thead_open = () => {
      return `<thead style="background-color: ${token.headerBg};">`;
    };

    md.renderer.rules.tr_open = () => {
      return `<tr style="border-bottom: ${token.lineWidth}px solid ${token.colorBorderSecondary};">`;
    };

    md.renderer.rules.th_open = () => {
      return `<th style="padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; font-weight: 600; color: ${token.colorTextHeading}; border-bottom: ${token.lineWidth}px solid ${token.colorBorderSecondary}; background-color: ${token.colorFillTertiary};">`;
    };

    md.renderer.rules.td_open = () => {
      return `<td style="padding: ${token.paddingXS}px ${token.paddingSM}px; border-bottom: ${token.lineWidth}px solid ${token.colorBorderSecondary}; color: ${token.colorText};">`;
    };

    // Inline code styling
    md.renderer.rules.code_inline = function (tokens, idx) {
      const content = tokens[idx].content;
      const inlineStyle = `background-color: ${token.colorFillSecondary}; color: ${token.colorText}; border: none; padding: 2px 4px; font-family: monospace; border-radius: ${token.borderRadiusSM}`;
      return `<code style="${inlineStyle}">${md.utils.escapeHtml(
        content
      )}</code>`;
    };

    return md;
  }, [token, isDarkMode]);

  return (
    <Typography.Paragraph
      style={{
        color: token.colorText,
        fontSize: screens.md ? token.fontSize : token.fontSizeLG,
      }}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: mdParser.render(content || ""),
        }}
      />
    </Typography.Paragraph>
  );
};

export default MarkdownRenderer;
