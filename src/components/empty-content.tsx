import { Container } from "./container.tsx";
import { MainLayout } from "./layouts/main-layout.tsx";

export function EmptyContent() {
  return (
    <MainLayout>
      <Container>
        <p>
          There&apos;s nothing here yet, check back later.
        </p>
      </Container>
    </MainLayout>
  );
}
