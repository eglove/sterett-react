import type { PropsWithChildren } from "react";

import { Navigation } from "../navigation/navigation.tsx";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
}
