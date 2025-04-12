import { match } from "path-to-regexp";

export const getBreadcrumbsFromFlatConfig = (
  location,
  configArray,
  context = {}
) => {
  for (const entry of configArray) {
    const { patterns, org = { show: false }, breadcrumbs = [] } = entry;

    for (const pattern of patterns) {
      try {
        const matcher = match(pattern, {
          decode: decodeURIComponent,
          end: false,
        });
        const matchResult = matcher(location);

        if (matchResult) {
          const params = matchResult.params;

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
                clickable: item.href !== undefined,
              };
            });

          return {
            org,
            breadcrumbs: resolved,
          };
        }
      } catch (err) {
        console.error("Invalid breadcrumb pattern:", pattern);
        console.error("Error:", err.message);
      }
    }
  }

  return { org: { show: false }, breadcrumbs: [] };
};
