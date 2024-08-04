import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "../router/router.ts";

export const adminRoute = createRoute({
  beforeLoad() {
    location.href = "https://admin.sterettcreekvillagetrustee.com";
  },
  component: () => {
    return null;
  },
  getParentRoute() {
    return rootRoute;
  },
  path: "/admin",
});
