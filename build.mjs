import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("sterett-react", "main", {
	scripts: ["UPDATE", "DEDUPE", "LINT", "BUILD"],
	isLibrary: false,
});
