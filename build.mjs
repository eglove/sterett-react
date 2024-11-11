import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("sterett-react", "main", {
  isLibrary: false,
  scripts: ["trash pnpm-lock.yaml", "pnpm up -i --latest", "pnpm dedupe", "pnpm lint", "pnpm build"],
});
