import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("sterett-react", "main", {
	preVersionBumpScripts: ["UPDATE"],
	postVersionBumpScripts: ["DEDUPE", "LINT"],
	isLibrary: false,
});
