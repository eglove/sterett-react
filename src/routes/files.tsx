import { createRoute } from "@tanstack/react-router";

import { Container } from "../components/container.tsx";
import { EmptyContent } from "../components/empty-content.tsx";
import { FileGrid } from "../components/files/file-grid.tsx";
import { MainLayout } from "../components/layouts/main-layout.tsx";
import { rootRoute } from "../router/router.tsx";
import { getFilesQueryOptions } from "../sanity/queries/get-files.ts";
import { getRouteQueries } from "../util/get-route-queries.ts";
import { setMeta } from "../util/set-meta.ts";

export const filesRouteQueries = {
  files: getFilesQueryOptions(),
};

export const filesRoute = createRoute({
  beforeLoad() {
    setMeta({
      description: "Covenants and files for Sterett Creek Village Trustee",
      title: "Sterett Creek Village Trustee | Files",
    });
  },
  component: FilesRoute,
  errorComponent: EmptyContent,
  getParentRoute() {
    return rootRoute;
  },
  async loader() {
    return getRouteQueries(filesRouteQueries);
  },
  path: "/files",
});

export function FilesRoute() {
  return (
    <MainLayout>
      <Container>
        <FileGrid />
      </Container>
    </MainLayout>
  );
}
