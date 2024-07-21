import { NextUIProvider } from "@nextui-org/react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Outlet } from "@tanstack/react-router";

import { persister } from "../clients/react-query/persister.ts";
import { QueryDevelopmentTools } from "../components/query-development-tools.tsx";
import { RouterDevelopmentTools } from "../components/router-development-tools.tsx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60, // 1 hour
      staleTime: 1000 * 60 * 60,
    },
  },
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <NextUIProvider>
        <Outlet />
        <RouterDevelopmentTools />
        <QueryDevelopmentTools />
      </NextUIProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
