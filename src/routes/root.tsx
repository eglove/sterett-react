import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";

import { QueryDevelopmentTools } from "../components/query-development-tools.ts";
import { RouterDevelopmentTools } from "../components/router-development-tools.ts";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60, // 1 minute
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Outlet />
        <RouterDevelopmentTools />
        <QueryDevelopmentTools />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
