import { useLocationProperty } from "wouter/use-location";
// import useLocation from "wouter/use-location"

const BASE = "/operaide-ui-clickdummy";

export function useCustomLocation() {
  const location = useLocationProperty("location");
  const setLocation = useLocationProperty("navigate");

  const customLocation = location.startsWith(BASE)
    ? location.slice(BASE.length) || "/"
    : location;

  const customNavigate = (to, options) =>
    setLocation(BASE + to, options);

  return [customLocation, customNavigate];
}

