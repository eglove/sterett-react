import { NextUIProvider } from "@nextui-org/react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { persister } from "../clients/react-query/persister.ts";

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
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </NextUIProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
