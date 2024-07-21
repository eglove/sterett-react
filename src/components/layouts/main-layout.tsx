import type { PropsWithChildren } from "react";

import { MotionRoute } from "../motion-route.tsx";
import { Navigation } from "../navigation/navigation.tsx";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <MotionRoute>
      <main>
        <Navigation />
        {children}
      </main>
    </MotionRoute>
  );
}
