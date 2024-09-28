import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("sterett-react", "main", {
  isLibrary: false,
  scripts: ["bun x taze latest -I", "bun lint", "bun run build"],
});
