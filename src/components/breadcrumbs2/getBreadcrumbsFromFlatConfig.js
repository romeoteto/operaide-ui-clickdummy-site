import { match } from "path-to-regexp";

export const getBreadcrumbsFromFlatConfig = (
  location,
  config,
  context = {}
) => {
  for (const [pattern, routeMeta] of Object.entries(config)) {
    const matcher = match(pattern, { decode: decodeURIComponent });
    const matchResult = matcher(location);

    if (matchResult) {
      const params = matchResult.params;
      const { org = { show: false }, breadcrumbs = [] } = routeMeta;

      const resolved = breadcrumbs
        .filter((item) => item.hidden !== true)
        .map((item) => {
          const label =
            typeof item.label === "function"
              ? item.label({ ...context, ...params })
              : item.label;

          const href =
            typeof item.href === "function"
              ? item.href({ ...context, ...params })
              : item.href;

          return {
            label,
            href,
            clickable: item.clickable !== false,
          };
        });

      return {
        org,
        breadcrumbs: resolved,
      };
    }
  }

  return { org: { show: false }, breadcrumbs: [] };
};
